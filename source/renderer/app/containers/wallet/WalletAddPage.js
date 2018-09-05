// @flow
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import WalletAdd from '../../components/wallet/WalletAdd';
import WalletCreateDialog from '../../components/wallet/WalletCreateDialog';
import WalletRestoreDialog from '../../components/wallet/WalletRestoreDialog';
import WalletFileImportDialog from '../../components/wallet/file-import/WalletFileImportDialog';
import WalletBackupDialog from '../../components/wallet/WalletBackupDialog';
import type { InjectedProps } from '../../types/injectedPropsType';
import resolver from '../../utils/imports';
import environment from '../../../../common/environment';

import WalletFileImportDialogContainer from './dialogs/WalletFileImportDialogContainer';
import WalletRestoreDialogContainer from './dialogs/WalletRestoreDialogContainer';
import WalletBackupDialogContainer from './dialogs/WalletBackupDialogContainer';
import WalletCreateDialogContainer from './dialogs/WalletCreateDialogContainer';

type Props = InjectedProps;
const Layout = resolver('containers/MainLayout');

@inject('actions', 'stores') @observer
export default class WalletAddPage extends Component<Props> {

  static defaultProps = { actions: null, stores: null };

  onClose = () => {
    this.props.actions.dialogs.closeActiveDialog.trigger();
  };

  render() {
    const wallets = this._getWalletsStore();
    const { actions, stores } = this.props;
    const { uiDialogs } = stores;
    const { isRestoreActive } = wallets;
    let content = null;

    if (uiDialogs.isOpen(WalletCreateDialog)) {
      content = <WalletCreateDialogContainer onClose={this.onClose} />;
    } else if (uiDialogs.isOpen(WalletBackupDialog)) {
      content = <WalletBackupDialogContainer onClose={this.onClose} />;
    } else if (uiDialogs.isOpen(WalletRestoreDialog)) {
      content = <WalletRestoreDialogContainer onClose={this.onClose} />;
    } else if (uiDialogs.isOpen(WalletFileImportDialog)) {
      content = <WalletFileImportDialogContainer onClose={this.onClose} />;
    } else {
      content = (
        <WalletAdd
          onCreate={() => actions.dialogs.open.trigger({ dialog: WalletCreateDialog })}
          onRestore={() => actions.dialogs.open.trigger({ dialog: WalletRestoreDialog })}
          onImportFile={() => actions.dialogs.open.trigger({ dialog: WalletFileImportDialog })}
          isRestoreActive={isRestoreActive}
          isMaxNumberOfWalletsReached={environment.isAdaApi() && wallets.hasMaxWallets}
        />
      );
    }
    return <Layout>{content}</Layout>;
  }

  _getWalletsStore() {
    return this.props.stores[environment.API].wallets;
  }

}
