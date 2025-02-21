import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NewsArticle } from "@/types/news";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Calendar, Link as LinkIcon } from "lucide-react";
import { format } from "date-fns";

interface NewsCardProps {
    article: NewsArticle;
    showImages?: boolean;
}

export function NewsCard({ article, showImages = true }: NewsCardProps) {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: article.title,
                    text: article.description,
                    url: article.url,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(article.url);
        }
    };

    return (
        <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
            {showImages && article.imageUrl && (
                <AspectRatio ratio={16 / 9} className="bg-muted">
                    <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="object-cover rounded-t-lg w-full h-full"
                        loading="lazy"
                    />
                </AspectRatio>
            )}
            <CardHeader className="flex-grow">
                <div className="flex justify-between items-start gap-2">
                    <Badge variant="outline">{article.source.name}</Badge>
                    <Button variant="ghost" size="icon" onClick={handleShare}>
                        <LinkIcon className="h-4 w-4" />
                    </Button>
                </div>
                <CardTitle className="line-clamp-2 hover:line-clamp-none">
                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        {article.title}
                    </a>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {article.description}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {format(new Date(article.publishedAt), "MMM d, yyyy")}
                    </div>
                    {article.author && (
                        <span className="italic truncate max-w-[50%]">{article.author}</span>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}