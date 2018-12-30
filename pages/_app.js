// NextJs takes care of persisting state from page to page by using the built in App Component
import App, {Container} from 'next/app';
// import Custom Page component
import Page from '../components/Page';

class EcommApp extends App{
    render(){
        const {Component} = this.props;

        return (
            <Container>
                <Page>
  <Component/>
                </Page>              
            </Container>
        )
    }
} 

export default EcommApp;