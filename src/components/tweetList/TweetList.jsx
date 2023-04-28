import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Alert,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TablePagination,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TweetCard from '../tweetCard/TweetCard';
import Loader from 'components/loader';

import {
  selectCards,
  selectCardsError,
  selectCardsLoading,
} from 'redux/cards/selectors';
import {
  selectSubscriptions,
  selectSubscriptionsError,
  selectSubscriptionsLoading,
} from 'redux/subscriptions/selectors';
import { ALL, FOLLOW, FOLLOWING } from '../../constants/filterItems';
import { fetchCards, updateCard } from '../../redux/cards/operations';
import { Placeholder, FormControlFilter } from './TweetList.styled';

const SUBSCRIPTION_ID = 1;
const TWEETS_COUNT = 100;

const TweetList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [filter, setFilter] = useState(ALL);
  const [viewCards, setViewCards] = useState([]);

  const cards = useSelector(selectCards);
  const subscriptions = useSelector(selectSubscriptions);
  const isCardsError = useSelector(selectCardsError);
  const isCardsLoading = useSelector(selectCardsLoading);
  const isSubscriptionsError = useSelector(selectSubscriptionsError);
  const isSubscriptionsLoading = useSelector(selectSubscriptionsLoading);

  const followings = useMemo(() => {
    return subscriptions?.[0]?.cardIds || [];
  }, [subscriptions]);

  const cardsCount = useMemo(() => {
    if (filter === ALL) {
      return TWEETS_COUNT;
    }
    const followingCount = followings.length;
    return filter === FOLLOW ? TWEETS_COUNT - followingCount : followingCount;
  }, [filter, followings]);

  useEffect(() => {
    const newViewCards = cards.map(card => ({
      ...card,
      isFollowing: !!followings?.includes(card.id),
    }));
    setViewCards(newViewCards);
  }, [followings, cards]);

  useEffect(() => {
    let search = '';
    if (filter === FOLLOWING) {
      search = 'id='.concat(followings.join('|'));
    } else if (filter === FOLLOW) {
      const allIds = Array.from({ length: 101 }, (_, index) =>
        String(++index).padStart(3, '0')
      );
      const otherIds = allIds.filter(id => !followings.includes(id));
      search = 'id='.concat(otherIds.join('|'));
    }
    dispatch(
      fetchCards({
        limit: pageSize,
        page: currentPage + 1,
        search,
      })
    );
  }, [currentPage, pageSize, filter]);

  return (
    <Placeholder>
      {(isCardsLoading || isSubscriptionsLoading) && <Loader />}
      {(isCardsError || isSubscriptionsError) && (
        <Alert severity="error">An error occurred while fetching data.</Alert>
      )}
      {!isCardsLoading &&
        !isSubscriptionsLoading &&
        !isCardsError &&
        !isSubscriptionsError && (
          <>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              marginBottom="20px"
              width="680px"
            >
              <Grid item>
                <Button
                  component={Link}
                  to="/home"
                  startIcon={<ArrowBackIcon />}
                  variant="contained"
                >
                  Go Back
                </Button>
              </Grid>
              <Grid item>
                <FormControlFilter>
                  <InputLabel id="select-label">Filter</InputLabel>
                  <Select
                    label="Filter"
                    labelId="select-label"
                    onChange={({ target }) => {
                      setFilter(target.value);
                      setCurrentPage(0);
                    }}
                    value={filter}
                  >
                    <MenuItem value={ALL}>All</MenuItem>
                    <MenuItem value={FOLLOW}>Follow</MenuItem>
                    <MenuItem value={FOLLOWING}>Followings</MenuItem>
                  </Select>
                </FormControlFilter>
              </Grid>
            </Grid>
            {filter === FOLLOWING && followings?.length === 0 && (
              <Alert severity="error">You have not following tweets</Alert>
            )}
            {(filter !== FOLLOWING || followings?.length > 0) && (
              <>
                {viewCards?.map(card => (
                  <TweetCard
                    card={card}
                    key={card.id}
                    toggleFollow={value => {
                      let newCardIds = [...followings];
                      if (value) {
                        newCardIds = [...newCardIds, card.id];
                      } else {
                        newCardIds = newCardIds.filter(id => id !== card.id);
                      }
                      dispatch(
                        updateCard({
                          card: {
                            avatar: card.avatar,
                            followers: value
                              ? card.followers + 1
                              : card.followers - 1,
                            id: card.id,
                            tweets: card.tweets,
                            user: card.user,
                          },
                          followingsData: {
                            cardIds: newCardIds,
                            id: SUBSCRIPTION_ID,
                          },
                        })
                      );
                    }}
                  />
                ))}
                <TablePagination
                  component="div"
                  count={cardsCount}
                  onRowsPerPageChange={({ target }) => {
                    setPageSize(target.value);
                    setCurrentPage(0);
                  }}
                  onPageChange={(event, value) => setCurrentPage(value)}
                  page={currentPage}
                  rowsPerPage={pageSize}
                  rowsPerPageOptions={[5, 10, 20, 50, 100]}
                />
              </>
            )}
          </>
        )}
    </Placeholder>
  );
};

export default TweetList;
