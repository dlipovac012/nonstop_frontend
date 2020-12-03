import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useContextReducer } from '../../context';
import { STORE_PLACE_DATA } from '../../reducers/constants';
import NetworkManager from '../../utils/api';
import Column from '../common/Column';
import Flex from '../common/Flex/Flex';
import { capitalizeWord, deepEqual } from '../../utils/helpers';
import MapComponent from './MapComponent';

function Details() {
	const [{ activeSlug, place }, dispatch] = useContextReducer();

	useEffect(() => {
		(async () => {
			try {
				if (activeSlug) {
					var data = (await NetworkManager.get(`/places/${activeSlug}`)).data;
				}
				
				dispatch({ type: STORE_PLACE_DATA, payload: data });
			} catch (error) {
				console.error(error);
			}
		})();
	}, [activeSlug, place]);

	return (
		<DetailsStyled hasLocation={place?.locations.length > 0}>
			<Flex>
				<HeadingStyled>
					<TitleStyled>{place?.name}</TitleStyled>
					<AddressParagraphStyled>{place?.address}</AddressParagraphStyled>
				</HeadingStyled>
			</Flex>
			<Flex>
				<Column>
					<SubtitleStyled>
						Ratings:
					</SubtitleStyled>
					<RatingWrapper>
						{Object.entries(normalizeFeedback(place?.feedback)).map(([key, value]) => {
							return (
								<RatingItemStyled key={key}>
									<span>{key}</span>
									<span>{value}</span>
								</RatingItemStyled>);
						})}
					</RatingWrapper>
				</Column>
				<Column>
					<SubtitleStyled>
				Opening Hours:
					</SubtitleStyled>
					<WorkingHoursUlStyled>
						{normalizeOpeningHours(place?.opening_hours)?.map(data => {
							if (!data.lastDay || data.day == data.lastDay) {
								return (
									<WorkingHoursLiStyled key={data.day}>
										<span>{capitalizeWord(data.day)}</span>
										{Array.isArray(data.hours) ? <span>{data.hours?.map((h, i) => {
											return (
												<span key={`${data.day}_${h.start}`}>
													{`${h.start} - ${h.end}${i + 1 >= data.hours.length ? '' : ' and '}`}
												</span>);
										})}</span> : data.hours}
									</WorkingHoursLiStyled>
								);
							}
							return (
								<WorkingHoursLiStyled key={data.day}>
									<span>{`${capitalizeWord(data.day)} - ${capitalizeWord(data.lastDay)}`}</span>
									{Array.isArray(data.hours) ? <span>{data.hours?.map((h, i) => {
										return (
											<span key={`${data.day}_${h.start}`}>
												{`${h.start} - ${h.end}${i + 1 >= data.hours.length ? '' : ' and '}`}
											</span>);
									})}</span> : data.hours}
								
								</WorkingHoursLiStyled>
							);
						})}
					</WorkingHoursUlStyled>
					<SubtitleStyled>
				Contact:
					</SubtitleStyled>
					<ContactsWrapper>
						<Flex justifyBetween>
							<Column noPadding>
								<SectionTitleStyled>{'Phone number:'}</SectionTitleStyled>
							</Column>
							<Column noPadding>
								{place?.contacts.map(contact => {
									return <span key={contact.id}>
										{contact.phone_number}
									</span>;
								})}
							</Column>
						</Flex>
					</ContactsWrapper>
				</Column>
			</Flex>
			{place?.locations.length ? (
				<Flex justifyCenter>
					<MapComponent width="640px" height="480px" location={place?.locations[0]} zoom={10} />
				</Flex>

			): null}
		</DetailsStyled>
	);

	function normalizeFeedback(feedback) {
		return feedback?.rating_summaries?.reduce((acc, cur) => {
			if (cur.display) {
				return {
					...acc,
					[capitalizeWord(cur?.dimension)]: cur.average.toFixed(2),
				};
			}
			return {
				...acc,
			};
		}, {}) || {};
	}

	function normalizeOpeningHours(hours) {
		const daysInOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

		/*
			Normalize days: every single day in the week should have working hours,
			or have closed status
		*/
		const normalizedDays = daysInOrder.map(day => {
			if (hours?.days[day]) {
				return {
					day,
					hours: hours?.days[day]
				};
			}
			return {
				day,
				hours: 'closed',
			};
		});

		// find last day in the row that has same working hours
		for (let i = 0; i < normalizedDays.length; i++) {
			for (let j = 1; j < normalizedDays.length; j++) {
				if (deepEqual(normalizedDays[i]?.hours, normalizedDays[j]?.hours)) {
					normalizedDays[i].lastDay = normalizedDays[j].day;
				}
			}
		}

		// find all days in between so that they can be removed
		const elementsToBeRemoved = [];
		for (let i = 0; i < normalizedDays.length; i++) {
			const j = normalizedDays.findIndex((e, k) => (k > i && deepEqual(normalizedDays[i]?.hours, e.hours)));

			if (j >= 0) {
				elementsToBeRemoved.push(j);
			}
		}

		// finally, remove those days that are supposed to be removed
		return normalizedDays.map((day, i) => {
			if (elementsToBeRemoved.some(index => index == i)) {
				return;
			}
			return day;
		}).filter(defined => defined);
	}
}

var DetailsStyled = styled.div`
	display: flex;
	flex-direction: column;
	flex-basis: 100%;
	position: relative;
	background-color: ${({ theme }) => theme.colors.background};
	border-left: 1px solid ${({ theme }) => theme.colors.borderPrimary};
	border-right: 1px solid ${({ theme }) => theme.colors.borderPrimary};
	${({ hasLocation }) => hasLocation && `
		justify-content: space-between;
	`}
`;

var HeadingStyled = styled.div`
	display: flex;
	flex-direction: column;
	padding: 16px 8px;
	flex-basis: 100%;
	// flex-wrap: wrap;
`;

var TitleStyled = styled.h1`
	display: flex;
	padding: 8px 32px;
	margin: 0;
	font-size: 28px;
`;

var AddressParagraphStyled = styled.p`
	display: flex;
	padding: 8px 32px;
	margin: 0;
	font-size: 16px;
`;

var SubtitleStyled = styled.h2`
	display: flex;
	font-size: 18px;
	font-weight: 500;
`;

var RatingWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

var RatingItemStyled = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 8px 16px;
	min-width: 50%;
`;

var WorkingHoursUlStyled = styled.ul`
	display: flex;
	flex-direction: column;
	list-style: none;
	padding-left: 16px;
`;

var WorkingHoursLiStyled = styled.li`
	display: flex;
	justify-content: space-between;
	padding: 8px 0;
`;

var ContactsWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

var SectionTitleStyled = styled.span`
	display: inline-flex;
	padding-left: 16px;
`;

export default Details;
