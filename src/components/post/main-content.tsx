import * as React from 'react';
import GraphSidecar from 'components/sidecar';
import { useQuery } from 'react-query';
import { Spinner } from 'components/ui';

const query_hash = '552bb33f4e58c7805d13d4f95da7d3a1';

const fetchContent = async (shortcode: string) => {
  try {
    const data = await fetch(
      `https://www.instagram.com/graphql/query/?query_hash=${query_hash}&variables={"shortcode"%3A"${shortcode}"%2C"child_comment_count"%3A3%2C"fetch_comment_count"%3A40%2C"parent_comment_count"%3A24%2C"has_threaded_comments"%3Atrue}`
    );
    const json = await data.json();
    return json.data.shortcode_media;
  } catch {
    return 'Error 404 :( &nbsp;';
  }
};

const MainContent = ({ shortcode }: Props) => {
  const { data, status } = useQuery<ShortCode_Media, string, any>(
    shortcode,
    () => fetchContent(shortcode)
  );

  if (status === 'loading') return <Spinner />;
  if (status === 'error' || typeof data === 'string') return <p>Error</p>;

  const { __typename: type, ...shortcode_media } = data;
  //render() //@return
  function render() {
    console.log(shortcode_media);
    switch (type) {
      case 'GraphVideo': {
        return (
          <video
            src={shortcode_media.video_url}
            onPlay={ev => (ev.currentTarget.volume = 0.2)}
            onClick={ev =>
              ev.currentTarget.paused
                ? ev.currentTarget.play()
                : ev.currentTarget.pause()
            }
            onDoubleClick={ev => ev.currentTarget.requestFullscreen()}
          ></video>
        );
      }
      case 'GraphSidecar': {
        return (
          <GraphSidecar URL={shortcode_media.edge_sidecar_to_children.edges} />
        );
      }
      default: {
        return (
          <img src={shortcode_media.display_url} alt='img' loading='lazy' />
        );
      }
    }
  }
  return <div className='post-content'>{render()}</div>;
};

interface Props {
  shortcode: string;
}

interface ShortCode_Media {
  __typename: string;
  video_url?: string;
  display_url?: string;
  edge_sidecar_to_children: {
    edges: any[];
  };
}

export default MainContent;
