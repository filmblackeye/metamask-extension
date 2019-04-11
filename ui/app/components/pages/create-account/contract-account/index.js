const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const PropTypes = require('prop-types')
const connect = require('react-redux').connect
import Select from 'react-select'

// Subviews
const ContractImportView = require('./contract-address.js')


AccountImportSubview.contextTypes = {
  t: PropTypes.func,
}

module.exports = connect()(AccountImportSubview)


inherits(AccountImportSubview, Component)
function AccountImportSubview () {
  Component.call(this)
}

AccountImportSubview.prototype.getMenuItemTexts = function () {
  return [
    this.context.t('contract'),
  ]
}

AccountImportSubview.prototype.render = function () {
  const state = this.state || {}
  const menuItems = this.getMenuItemTexts()
  const { type } = state

  return (
    h('div.new-account-import-form', [

      h('.new-account-import-disclaimer', [
        h('span', this.context.t('importContractMsg')),
        h('span', {
          style: {
            cursor: 'pointer',
            textDecoration: 'underline',
          },
          // gnosis to do: link to some more specific gnosis docs
          onClick: () => {
            global.platform.openWindow({
              url: 'https://safe.gnosis.io/',
            })
          },
        }, this.context.t('here')),
      ]),

      h('div.new-account-import-form__select-section', [

        h('div.new-account-import-form__select-label', this.context.t('selectType')),

        h(Select, {
          className: 'new-account-import-form__select',
          name: 'import-type-select',
          clearable: false,
          value: type || menuItems[0],
          options: menuItems.map((type) => {
            return {
              value: type,
              label: type,
            }
          }),
          onChange: (opt) => {
            this.setState({ type: opt.value })
          },
        }),

      ]),

      this.renderImportView(),
    ])
  )
}

AccountImportSubview.prototype.renderImportView = function () {
  const state = this.state || {}
  const { type } = state
  const menuItems = this.getMenuItemTexts()
  const current = type || menuItems[0]

  switch (current) {
    case this.context.t('contract'):
      return h(ContractImportView)
    default:
      return h(ContractImportView)
  }
}
