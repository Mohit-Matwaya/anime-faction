import * as React from 'react';
import { useState } from 'react';
import { Spinner } from 'components/ui';
import { usePaginatedQuery } from 'react-query';
import { Caption, ContentBody, Rating } from './';
import { POSTS_URI, morePosts_URI } from 'api-uri';
import './post.scss';

const fetchPosts = async (end_cursor?: string): Promise<Posts | any> => {
    const query_hash = '7c8a1055f69ff97dc201e752cf6f0093';
    try {
        const data = await fetch(
            end_cursor ? morePosts_URI(query_hash, end_cursor) : POSTS_URI
        );
        const json = await data.json();
        const { user } = end_cursor ? json.data : json.graphql;

        return user.edge_owner_to_timeline_media;
    } catch {
        return 'Error, Try reloading';
    }
};

export default () => {
    const [endCursor, setEndCursor] = useState<string | null>(null);

    const { data: posts, error, status } = usePaginatedQuery<Posts, string>(
        ['posts', endCursor],
        () => fetchPosts(endCursor)
    );

    // Guard Clause
    if (status === 'loading') return <Spinner />;
    if (error) return <h2>{error}</h2>;

    return (
        <>
            <div className='container-post'>
                {posts.edges.map(({ node }, index: number) => (
                    <div className='post' key={index}>
                        <ContentBody shortcode={node.shortcode} />
                        <Rating
                            isVideo={node.is_video}
                            likes={node.edge_media_preview_like.count}
                            comments={node.edge_media_to_comment.count}
                            views={node.video_view_count}
                        />
                        <Caption
                            captions={
                                node.edge_media_to_caption.edges[0].node.text
                            }
                        />
                    </div>
                ))}
            </div>
            <button
                className='load-more'
                onClick={() => setEndCursor(posts.page_info.end_cursor)}
            >
                Load More
            </button>
        </>
    );
};

interface Posts {
    edges: Array<PostEdge | never>;
    error: string;
    page_info: {
        has_next_page: string;
        end_cursor: string;
    };
    count?: number;
}

interface PostEdge {
    node: {
        shortcode: string;
        is_video: boolean;
        edge_media_preview_like: { count: number };
        edge_media_to_comment: { count: number };
        edge_media_to_caption: {
            edges: Array<{ node: { text: string } }>;
        };
        video_view_count: number;
    };
}
