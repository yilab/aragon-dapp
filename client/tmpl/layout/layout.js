// @flow
import { Template } from 'meteor/templating'
import { $ } from 'meteor/jquery'
import { ReactivePromise } from 'meteor/deanius:promise'

const tmpl = Template.Layout

const toggleMetaMask = (show: boolean = true) => {
  const metaMask = $('#Layout_MetaMask')
  const toggleClass = (show) ? 'hidden' : 'visible'
  if (metaMask.hasClass(toggleClass)) {
    metaMask.transition('fade down')
  }
}

tmpl.onRendered(() => {
  $(document).on('click', (e) => {
    const walletButton = $('#walletButton')
    if (e.target !== walletButton[0] && e.target !== walletButton.find('.icon')[0]) {
      toggleMetaMask(false)
    }
  })

  window.resizePopups = () => {
    $('.ui.scrollable.popup').css('max-height', $(window).height() - 128)
  }

  $(window).resize(() => (window.resizePopups()))
})

tmpl.events({
  'click #walletButton': () => $('#Layout_MetaMask').transition('fade down'),
  'click #reload': () => (location.reload()),
})

tmpl.helpers({
  companyAddress: ReactivePromise(() => (localStorage.getItem('companyAddress'))),
})

window.addEventListener('message', (msg) => {
  if (!msg.data.metaMask) return
  if (msg.data.metaMask === 'show') toggleMetaMask()
})
