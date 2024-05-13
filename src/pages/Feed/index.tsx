import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import { NewsCard } from 'src/components/atoms/NewsCard';
import Divider from '@mui/material/Divider';
import { fetchArticlesWithQuery, fetchTopHeadlines } from 'src/utils';
import { getLocalStorageData } from 'src/services/local-storage';
import { useNavigate } from 'react-router-dom';
import { HeadlinesCarousel } from 'src/components/atoms/Carousel';
import NewsCardSkeleton from 'src/components/atoms/SkeletonLoader';
import { useSnackbar } from 'src/components/atoms/Snackbar';


const NewsFeed: React.FC = () => {
    const [articles, setArticles] = useState([]);
    const [headlines, setHeadlines] = useState([]);
    const [query, setQuery] = useState([]);

    const { showSnackBar } = useSnackbar()
    const navigate = useNavigate()

    const fetchArticles = async () => {
        try {
            const searchedArticles = await fetchArticlesWithQuery(query);
            setArticles(searchedArticles);
            const topHeadlines = await fetchTopHeadlines();
            setHeadlines(topHeadlines);
        } catch (error) {
            showSnackBar('Error fetching news', 'error');
        }
    }

    useEffect(() => {
        if (query.length) {
            fetchArticles()
        }
    }, [query.length])

    useEffect(() => {
        if (getLocalStorageData('category')) {
            setQuery(getLocalStorageData('category'));
        } else {
            navigate('/settings');
        }
    }, [])

    return (
        <Container className='flex flex-col gap-12 p-6' maxWidth="xl">
            <Grid container spacing={3}>
                <HeadlinesCarousel headlines={headlines} />
                <h5 className='font-bold text-2xl text-black underline capitalize'>Your Feed</h5>
                {articles?.length ? articles?.filter((article) => article.coverImgUrl).map((article, index: number) => (
                    <div className='flex flex-col w-full gap-12' key={index}>
                        <NewsCard props={article} />
                        <Divider variant='middle' />
                    </div>
                )) :
                    <NewsCardSkeleton />
                }
            </Grid>
        </Container>
    );
};

export default NewsFeed;