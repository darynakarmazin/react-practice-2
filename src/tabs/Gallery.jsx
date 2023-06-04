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
      images: [...prevState.images, result.photos],
    }));
    console.log(result);
  };

  // componentDidMount() {
  //   ImageService.getImages('dog', 1);
  // }

  handleSumit = query => {
    this.setState({ query });
    // console.log(query);
  };

  render() {
    return (
      <>
        <SearchForm onSubmit={this.handleSumit} />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
