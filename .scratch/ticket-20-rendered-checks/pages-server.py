# Serves dist/ the way GitHub Pages does: an unknown path gets 404.html with a
# 404 status, and a directory gets its index.html.
import http.server, os, sys

ROOT = sys.argv[1]
PORT = int(sys.argv[2])

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def send_error(self, code, message=None, explain=None):
        if code == 404:
            body = open(os.path.join(ROOT, '404.html'), 'rb').read()
            self.send_response(404)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            if self.command != 'HEAD':
                self.wfile.write(body)
            return
        super().send_error(code, message, explain)

    def log_message(self, *a):
        pass

http.server.ThreadingHTTPServer(('127.0.0.1', PORT), Handler).serve_forever()
