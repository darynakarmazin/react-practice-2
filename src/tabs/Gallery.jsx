import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query) {
      this.getImages(query, page);
    }
  }

  getImages = async (query, page) => {
    const result = await ImageService.getImages(query, page);
    this.setState(prevState => ({
      images: [...prevState.images, ...result.photos],
    }));
    console.log(result);
  };

  // componentDidMount() {
  //   ImageService.getImages('dog', 1);
  // }

  handleSubmit = query => {
    if (query !== this.state.query) {
      this.setState({ images: [], page: 1 });
    }
    this.setState({ query });
    // console.log(query);
  };

  render() {
    const { images } = this.state;
    console.log(images);
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        <Grid>
          {images.map(({ id, src: { small }, alt }) => {
            return (
              <GridItem key={id}>
                <CardItem>
                  <img src={small} alt={alt} />
                </CardItem>
              </GridItem>
            );
          })}
        </Grid>
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
