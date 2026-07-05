import http.server
import socketserver
import functools

PORT = 8090
DIRECTORY = "/Users/notebig/Documents/tpc3mcarcare-site"

Handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=DIRECTORY)

class Server(socketserver.TCPServer):
    allow_reuse_address = True

with Server(("", PORT), Handler) as httpd:
    httpd.serve_forever()
