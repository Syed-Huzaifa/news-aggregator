import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import { NewsCard } from 'src/components/atoms/NewsCard';
import Divider from '@mui/material/Divider';
import { getLocalStorageData } from 'src/services/local-storage';
import { useNavigate } from 'react-router-dom';
import FormDialog from 'src/components/atoms/FiltersDialog';
import { normalizeAndMergeArticles } from 'src/utils';
import { applyFilter } from 'src/services/use-filter';
import InfiniteScroll from "react-infinite-scroll-component";
import NewsCardSkeleton from 'src/components/atoms/SkeletonLoader';
import { fetchNewsApi } from 'src/services/use-news-api';


const FilterNews: React.FC = () => {
    const [articles, setArticles] = useState([]);
    const [query, setQuery] = useState([]);
    const [page, setPage] = useState(1);
    const [savedFilters, setSavedFilters] = useState();
    const navigate = useNavigate()

    const createFilterParams = (filters) => {
        let params = {};
            params = {
                ...params,
                q: query,
                'apiKey': process.env.REACT_APP_NEWS_API_KEY,
                page: page
            }
            let searchFilters = applyFilter(filters);
            params = {
                ...params,
                ...searchFilters
            }
            return params;
    }

    const fetchArticles = async (filters?: any) => {
        try {
            const searchedArticles = await fetchNewsApi(createFilterParams(filters));
            setSavedFilters(filters);
            setArticles(normalizeAndMergeArticles(searchedArticles));
        } catch (error) {
            console.log(error);
        }
    }

    const handlePageChange = async () => {
        setPage(page + 1);
        try {
            const searchedArticles = await fetchNewsApi(createFilterParams(savedFilters));
            setArticles([...articles, ...normalizeAndMergeArticles(searchedArticles)]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (query) {
            fetchArticles()
        }
    }, [query])

    useEffect(() => {
        if (getLocalStorageData('category')) {
            setQuery(getLocalStorageData('category'));
        } else {
            navigate('/settings')
        }
    }, [])

    return (
        <Container className='flex flex-col gap-12 p-6' maxWidth="xl">
            <Grid container spacing={3}>
                <div className='flex justify-end mr-10 gap-8 w-full'>
                    <FormDialog applyFilter={(value: any) => { fetchArticles(value) }} />
                </div>
                <h5 className='font-bold text-2xl text-black underline capitalize'>Your Feed</h5>
                <InfiniteScroll dataLength={articles?.length} next={handlePageChange} hasMore={true} loader={<NewsCardSkeleton />}>
                    {articles.length ? articles?.filter((article) => article.coverImgUrl).map((article, index: number) => (
                        <div className='flex flex-col w-full gap-12' key={index}>
                            <NewsCard props={article} />
                            <Divider variant='middle' />
                        </div>
                    )) :
                        <NewsCardSkeleton />
                    }
                </InfiniteScroll>
            </Grid>
        </Container>
    );
};

export default FilterNews;