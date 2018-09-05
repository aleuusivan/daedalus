// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { defineMessages } from 'react-intl';
import { shell } from 'electron';

import CenteredLayout from '../components/layout/CenteredLayout';
import Loading from '../components/loading/Loading';
import BugReportDialog from '../components/profile/bug-report/BugReportDialog';
import adaLogo from '../assets/images/ada-logo.inline.svg';
import cardanoLogo from '../assets/images/cardano-logo.inline.svg';
import type { InjectedProps } from '../types/injectedPropsType';

import WalletSupportRequestPage from './wallet/WalletSupportRequestPage';

export const messages = defineMessages({
  loadingWalletData: {
    id: 'loading.screen.loadingWalletData',
    defaultMessage: '!!!Loading wallet data',
    description: 'Message "Loading wallet data" on the loading screen.',
  },
});

@inject('stores', 'actions')
@observer
export default class LoadingPage extends Component<InjectedProps> {
  render() {
    const { stores } = this.props;
    const { isSynced, syncPercentage, hasBeenConnected } = stores.networkStatus;
    const { isConnecting, isSyncing, hasSyncingStarted } = stores.networkStatus.networkStatus;
    const { hasLoadedCurrentLocale, hasLoadedCurrentTheme, currentLocale } = stores.profile;
    return (
      <CenteredLayout>
        <Loading
          currencyIcon={adaLogo}
          apiIcon={cardanoLogo}
          isSyncing={isSyncing}
          isSynced={isSynced}
          isConnecting={isConnecting}
          syncPercentage={syncPercentage}
          loadingDataForNextScreenMessage={messages.loadingWalletData}
          hasBeenConnected={hasBeenConnected}
          hasBlockSyncingStarted={hasSyncingStarted}
          hasLoadedCurrentLocale={hasLoadedCurrentLocale}
          hasLoadedCurrentTheme={hasLoadedCurrentTheme}
          currentLocale={currentLocale}
          handleReportIssue={this.handleReportIssue}
          onProblemSolutionClick={this.handleProblemSolutionClick}
        />
        <WalletSupportRequestPage />
      </CenteredLayout>
    );
  }

  handleReportIssue = () => {
    this.props.actions.dialogs.open.trigger({
      dialog: BugReportDialog,
    });
  };

  handleProblemSolutionClick = (link: string) => {
    shell.openExternal(`https://${link}`);
  };
}
