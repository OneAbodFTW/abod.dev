const worker = {
  fetch(request, env) {
    const url = new URL(request.url)

    if (url.protocol === 'http:' || url.hostname === 'www.abod.dev') {
      url.protocol = 'https:'
      if (url.hostname === 'www.abod.dev') url.hostname = 'abod.dev'
      return Response.redirect(url.toString(), 308)
    }

    return env.ASSETS.fetch(request)
  }
}

export default worker
