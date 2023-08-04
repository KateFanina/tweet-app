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
} from '@mui/material';
import {
  alpha,
  createTheme,
  getContrastRatio,
  ThemeProvider,
} from '@mui/material/styles';
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
import { Placeholder, FormControlFilter, Pagination } from './TweetList.styled';

const violetBase = 'rgb(71, 28, 169)';
const violetMain = alpha(violetBase, 2);

const theme = createTheme({
  palette: {
    violet: {
      main: alpha(violetBase, 0.9),
      light: alpha(violetBase, 0.7),
      dark: violetMain,
      contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
  },
});


const SUBSCRIPTION_ID = 1;
const TWEETS_COUNT = 100;

const TweetList = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(3);
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
    <ThemeProvider theme={theme}>
      {(isCardsLoading || isSubscriptionsLoading) && <Loader />}
      {(isCardsError || isSubscriptionsError) && (
        <Alert severity="error">An error occurred while fetching data.</Alert>
      )}
      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
        marginBottom="20px"
      >
        <Grid item>
          <Button
            color="violet"
            component={Link}
            to="/home"
            startIcon={<ArrowBackIcon />}
            variant="contained"
          >
            Go Back
          </Button>
        </Grid>
        <Grid item>
          <FormControlFilter size="small">
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
      {!isCardsLoading &&
        !isSubscriptionsLoading &&
        !isCardsError &&
        !isSubscriptionsError && (       
          <Placeholder>     
            {filter === FOLLOWING && followings?.length === 0 && (
              <Alert severity="error">You have not following tweets</Alert>
            )}
            {(filter !== FOLLOWING || followings?.length > 0) && (
                viewCards?.map(card => (
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
                ))
            )}
          </Placeholder>
        )}
        <Pagination
          component="div"
          count={cardsCount}
          onRowsPerPageChange={({ target }) => {
            setPageSize(target.value);
            setCurrentPage(0);
          }}
          onPageChange={(event, value) => setCurrentPage(value)}
          page={currentPage}
          rowsPerPage={pageSize}
          rowsPerPageOptions={[3, 6, 9, 12, 24]}
        />
    </ThemeProvider>
  );
};

export default TweetList;
