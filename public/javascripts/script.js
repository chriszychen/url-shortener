const copyButton = document.querySelector('#copy-button')
copyButton.addEventListener('click', event => {
  const urlText = document.querySelector('#url-text').textContent
  const copyText = document.querySelector('#copy-text')
  navigator.clipboard.writeText(urlText)
    .then(() => {
      copyText.textContent = 'Copied!'
    })
    .catch(err => {
      console.log(err)
      copyText.textContent = 'Failed to copy'
    })
})
