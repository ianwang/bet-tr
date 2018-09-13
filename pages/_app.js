import { withRouter } from 'next/router'
import App, { Container } from 'next/app'
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from 'libs/getPageContext';

import Layout from 'components/Layout'

class MyApp extends App {

  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  pageContext = null;

  componentDidMount () {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  render () {
    const { Component, pageProps, router } = this.props
    const { asPath, pathname, query } = router
    const url = {
      asPath,
      pathname,
      query
    }
    return (
      <Container>
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}>
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}>

            <Layout>
              <Component
                pageContext={this.pageContext}
                {...pageProps}
                url={url} />
            </Layout>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    )
  }
}

export default withRouter(MyApp)
