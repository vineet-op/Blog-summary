
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function BlogCard({ imageUrl, title, content, summary, category }) {
    return (
        <Card className="w-full max-w-md overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <div className="relative h-48 w-full">
                <img
                    src={imageUrl}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-all duration-300 hover:scale-105"
                />
            </div>
            <CardHeader>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-bold text-gray-100">{title}</h3>
                    <Badge variant="secondary" className="bg-blue-600 text-white">
                        {category}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-gray-300 mb-4">{content}</p>
                <p className="text-sm text-gray-400">{summary}</p>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button variant="outline" className="text-blue-400 hover:text-blue-300 border-blue-400 hover:border-blue-300">
                    Read More
                </Button>
            </CardFooter>
        </Card>
    )
}

