import { Box, Typography } from "@material-ui/core"
import { formatDate } from 'src/utils';

export const HeadlinesCarouselItem = ({ headline }) => {
    return (
        <div className="flex flex-col lg:flex-row justify-between p-12 border">
            <div className="flex flex-col justify-between text-left w-full lg:w-1/2">
                <Typography>{formatDate(headline.publishedAt)}</Typography>
                <Typography variant="h5" color="textPrimary">{headline.title}</Typography>
                <Typography>{headline.description}</Typography>
                <Typography>{headline.author}</Typography>
            </div>
            <Box>
                <img className="max-w-sm" src={headline.urlToImage} alt="" />
            </Box>
        </div>
    )
}