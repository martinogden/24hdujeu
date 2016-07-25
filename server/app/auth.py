import base64
import json
import hashlib
import hmac
import requests

from . import app


FACEBOOK_API_BASE_URL = 'https://graph.facebook.com'
HMAC_SHA256 = 'HMAC-SHA256'


class OAuthException(Exception):
	pass


class SignedRequestDecodeException(Exception):
	pass


def get_user(access_token):
	url = "%s/me" % FACEBOOK_API_BASE_URL
	fields = ('id', 'name', 'email', 'picture')

	headers = {'Authorization': 'Bearer %s' % access_token}
	params = {'fields': ','.join(fields)}
	response = requests.get(url, params=params, headers=headers)

	if not response.ok:
		try:
			msg = response.json()['message']
		except KeyError:
			raise OAuthException(msg)

	return response.json()


def _decode(string):
	padding = '=' * (-len(string) % 4)
	return base64.urlsafe_b64decode(str(string) + padding)


def parse_signed_request(signed_request):
	""" Check provided facebook signed_request against our app
		secret_key to ensure request is from facebook.

		:raises: {SignedRequestDecodeException}
		:returns: {dict} request payload
	"""

	# get payload and signed payload hash
	try:
		exp_signed, b64_payload = signed_request.split('.')
		exp_signed = _decode(exp_signed) 
		payload = _decode(b64_payload)
		payload = json.loads(payload)
	except (ValueError, TypeError):
		raise SignedRequestDecodeException

	# ensure payload signed using sha256
	if not payload.get('algorithm', '').upper() == HMAC_SHA256:
		err_msg = "Must use %s algorithm" % HMAC_SHA256
		raise SignedRequestDecodeException(err_msg)

	# validate signed request
	key = app.config['FACEBOOK_CLIENT_SECRET']
	msg = b64_payload.encode('ascii')
	signed = hmac.new(key, msg=msg, digestmod=hashlib.sha256).digest()

	if signed != exp_signed:
		raise SignedRequestDecodeException("Invalid signed request")

	return payload