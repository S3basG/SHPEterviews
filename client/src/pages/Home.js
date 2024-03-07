import React, { useContext} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {

  const { user } = useContext(AuthContext)
  /*const {
    loading, data: { getPosts: posts }
  } = useQuery(FETCH_POSTS_QUERY);

  if(data){
    console.log(data)
  }*/
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);


  if (loading) return <div>Loading</div>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;


  const posts = data.getPosts;
  console.log(posts);

  return (
    <Grid columns = {3}>
      <Grid.Row className= "page-title">
        <h1> Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>loading posts..</h1>
        ) : (
          <Transition.Group>
            {
              posts && posts.map((post) => (
                <Grid.Column key={post.id} style = {{ marginBottom: 20 }}>
                  <PostCard post={post}/>
                </Grid.Column>
              ))
            }
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
    
  );

}

export default Home;