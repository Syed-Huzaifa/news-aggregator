import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { NewsCard } from 'src/components/atoms/NewsCard';
import Divider from '@mui/material/Divider';
import { fetchArticlesWithQuery, fetchTopHeadlines } from 'src/utils';
import { useDebounce } from 'src/helpers/use-debounce';
import { getLocalStorageData } from 'src/services/local-storage';
import { useNavigate } from 'react-router-dom';
import { HeadlinesCarousel } from 'src/components/atoms/Carousel';
  

const NewsFeed: React.FC = () => {
    const [articles, setArticles] = useState([]);
    const [headlines, setHeadlines] = useState([]);
    const [query, setQuery] = useState([]);
    const navigate = useNavigate()

    const fetchArticles = async () => {
        try {
            const searchedArticles = await fetchArticlesWithQuery(query);
            setArticles(searchedArticles);
            const topHeadlines = await fetchTopHeadlines();
            setHeadlines(topHeadlines);
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleQueryChange = useDebounce(async (value) => {
        const userPreferences = getLocalStorageData('category');
        userPreferences.push(value);
        setQuery(userPreferences);
    }, 500)

    useEffect(() => {
        if (query.length) {
            fetchArticles()
        }
    }, [query.length])

    useEffect(() => {
        console.log('emmpty use effect')
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
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Typography variant='h4'>Oops! We couldn't find your desired results.</Typography>
                    <Typography variant='h6'>Please try narrowing your search from the categories</Typography>
                </Box>
                }
            </Grid>
        </Container>
    );
};

export default NewsFeed;