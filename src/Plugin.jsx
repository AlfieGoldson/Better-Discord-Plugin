export default ([Plugin, BDFDB]) => {
	const React = {
		createElement: (el, props, children) =>
			BDFDB.ReactUtils.createElement(el, {
				...(props ?? {}),
				children,
			}),
	};

	return class Corehalla extends Plugin {
		onLoad() {
			console.log('Lib', BDFDB.LibraryModules);

			this.patchedModules = {
				after: {
					UserPopout: 'componentDidMount',
					UserProfile: 'componentDidMount',
				},
			};
		}

		onStart() {
			this.forceUpdateAll();
		}

		injectStats(e) {
			console.log('inject', e);
		}

		onUserContextMenu(e) {
			if (e.instance.props.user) {
				let [children, index] = BDFDB.ContextMenuUtils.findItem(
					e.returnvalue,
					{
						id: 'devmode-copy-id',
						group: true,
					}
				);
				children.splice(
					index > -1 ? index : children.length,
					0,
					BDFDB.ContextMenuUtils.createItem(
						BDFDB.LibraryComponents.MenuItems.MenuGroup,
						{
							children: BDFDB.ContextMenuUtils.createItem(
								BDFDB.LibraryComponents.MenuItems.MenuItem,
								{
									label: 'Corehalla',
									id: BDFDB.ContextMenuUtils.createItemId(
										this.name,
										'blabla'
									),
									action: () => {
										this.openUserSettingsModal(
											e.instance.props.user
										);
										console.log('Corehalla');
									},
								}
							),
						}
					)
				);
			}
		}

		processUserProfile(e) {
			console.log('profile', e);
		}

		onStop() {
			this.forceUpdateAll();
		}

		forceUpdateAll() {
			BDFDB.PatchUtils.forceAllUpdates(this);
			BDFDB.ChannelUtils.rerenderAll();
		}

		setLabelsByLanguage() {
			switch (BDFDB.LanguageUtils.getLanguage().id) {
				default:
					// English
					return {
						context_hidehidden: 'Hide Locked Channels',
						modal_allowed: 'Permitted',
						modal_denied: 'Denied',
					};
			}
		}

		openUserSettingsModal(user) {
			BDFDB.ModalUtils.open(this, {
				size: 'MEDIUM',
				header: 'Corehalla Stats',
				subHeader: `${user.username}#${user.discriminator}`,
				children: [
					<BDFDB.LibraryComponents.ModalComponents.ModalTabContent tab='Stats'>
						<div>
							<BDFDB.LibraryComponents.Flex>
								<img
									style={{
										objectFit: 'contain',
										minWidth: '100px',
										height: '100px',
									}}
									src='https://neue.corehalla.com/images/ranked-banners/Diamond.png'
								/>
							</BDFDB.LibraryComponents.Flex>
						</div>
					</BDFDB.LibraryComponents.ModalComponents.ModalTabContent>,
					<BDFDB.LibraryComponents.ModalComponents.ModalTabContent tab='XD'>
						<div>
							<BDFDB.LibraryComponents.Flex>
								Ranked
							</BDFDB.LibraryComponents.Flex>
						</div>
					</BDFDB.LibraryComponents.ModalComponents.ModalTabContent>,
				],
			});
		}
	};
};
