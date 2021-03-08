import React from 'react';
import App, { Container } from 'next/app';
import { Provider, useStaticRendering } from 'mobx-react';
import { UserStore } from '../stores/UserStore';
import { UIStore } from '../stores/UIStore';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

let store = null;

function initializeStore(initialData = {}) {
  if (isServer) {
    return {
      userStore: new UserStore(),
      uiStore: new UIStore(),
    };
  }
  if (store === null) {
    store = {
        userStore: new UserStore(),
        uiStore: new UIStore(),
    };
  }

  return store;
}

class CustomApp extends App {
    private mobxStore: any;

  static async getInitialProps(appContext) {
    const mobxStore = initializeStore();
    appContext.ctx.mobxStore = mobxStore;
    const appProps = await App.getInitialProps(appContext);
    return {
      ...appProps,
      initialMobxState: mobxStore,
    };
  }

  constructor(props) {
    super(props);
    const isServer = typeof window === 'undefined';
    this.mobxStore = isServer ? props.initialMobxState : initializeStore(props.initialMobxState);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider {...this.mobxStore}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </Provider>
    );
  }
}

export default CustomApp;