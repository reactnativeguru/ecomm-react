import React, { Component } from 'react'
import Meta from './Meta';
import Header from './Header';
import Nav from './Nav';
import styled, {ThemeProvider, injectGlobal} from 'styled-components';

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

const StyledPage = styled.div`
  background: white,
  color: ${props => props.theme.black}
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0: auto;
  padding: 2rem;
  background: ${props => props.theme.red};
`

export default class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
      <StyledPage>
      <StyledPage/>
      <Nav/>
      <Header/>
        <Inner>{this.props.children}</Inner>
      </StyledPage>
      </ThemeProvider>
    )
  }
}