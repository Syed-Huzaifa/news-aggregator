import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography } from '@material-ui/core';
import { NewsCard } from 'src/components/atoms/NewsCard';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { useDebounce } from 'src/helpers/use-debounce';
import { getLocalStorageData } from 'src/services/local-storage';
import { useNavigate } from 'react-router-dom';
import { fetchNytApi } from 'src/services/use-nyt-api';
import FormDialog from 'src/components/atoms/FiltersDialog';
import { normalizeAndMergeArticles } from 'src/utils';
  

const FilterNews: React.FC = () => {
    const [articles, setArticles] = useState([]);
    const [query, setQuery] = useState([]);
    const navigate = useNavigate()

    const fetchArticles = async () => {
        try {
            const searchedArticles = await fetchNytApi({ q: query, 'api-key': process.env.REACT_APP_NYT_API_KEY });
            setArticles(normalizeAndMergeArticles(searchedArticles));
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleQueryChange = useDebounce(async (value) => {
        setQuery(value);
    }, 500)

    useEffect(() => {
        if (query) {
            fetchArticles()
        }
    }, [query])

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
            <div className='flex justify-end mr-10 gap-8 w-full'>
                <FormDialog />
            </div>
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

export default FilterNews;