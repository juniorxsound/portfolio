#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import logging
from urlparse import urlparse, urlunparse

import webapp2
from webapp2_extras.routes import DomainRoute
from webapp2 import Route

DOMAIN_NAME = 'orfleisher.com'


class MainHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write('Hello world! from Webapp2')


class TestHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write('Another url')


class RedirectHandler(webapp2.RequestHandler):
    """Redirects from naked to www subdomain"""

    def get(self, path):
        url = self.request.url
        urlparts = urlparse(url)
        if urlparts.netloc == DOMAIN_NAME:
            urlparts_list = list(urlparts)
            urlparts_list[1] = 'www.' + DOMAIN_NAME
            new_url = urlunparse(urlparts_list)
            logging.debug("redirecting from {} to {}".format(url, new_url))
            return self.redirect(new_url, permanent=True)


app = webapp2.WSGIApplication([
    DomainRoute(DOMAIN_NAME, [Route(r'<:.*>', handler=RedirectHandler)]),
    Route(r'/', handler=MainHandler),
    Route(r'/test', handler=TestHandler)
], debug=True)