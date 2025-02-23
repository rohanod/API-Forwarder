import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">API Forwarder</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">How to Use</h2>
            <p className="text-lg mb-4">Send requests to:</p>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl mb-2">JSON Format</h3>
                <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                  {`/{target-api-url}?headers={"key":"value","another-key":"another-value"}`}
                </pre>
              </div>
              <div>
                <h3 className="text-xl mb-2">Simple Format</h3>
                <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                  {`/{target-api-url}?headers=Accept:application/json`}
                </pre>
              </div>
              <div>
                <h3 className="text-xl mb-2">Direct Request</h3>
                <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                  {`/{target-api-url}`}
                </pre>
                <p className="text-sm mt-2 text-gray-600">Original request headers will be forwarded</p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Examples</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl mb-2">JSON API Request (JSON format)</h3>
                <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                  {`/icanhazdadjoke.com?headers={"Accept":"application/json"}`}
                </pre>
              </div>
              <div>
                <h3 className="text-xl mb-2">JSON API Request (Simple format)</h3>
                <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                  {`/icanhazdadjoke.com?headers=Accept:application/json`}
                </pre>
              </div>
              <div>
                <h3 className="text-xl mb-2">Multiple Headers</h3>
                <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                  {`/api.example.com/data?headers={"Authorization":"Bearer token","Accept":"application/json"}`}
                </pre>
              </div>
              <div>
                <h3 className="text-xl mb-2">Full URL</h3>
                <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                  {`/https://api.example.com/data?headers={"Accept":"application/json"}`}
                </pre>
              </div>
              <div>
                <h3 className="text-xl mb-2">p5 Python Usage</h3>
                <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                  {`data = loadJSON('http://localhost:3001/icanhazdadjoke.com?headers={"Accept":"application/json"}')`}
                </pre>
                <p className="text-sm mt-2 text-gray-600">The response will be automatically converted to a Python list/dictionary</p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Supports GET, POST, PUT, and DELETE methods</li>
              <li>Forwards original request headers automatically</li>
              <li>Override headers using JSON or simple format</li>
              <li>Automatic content type handling</li>
              <li>Works with both HTTP and HTTPS URLs</li>
              <li>Error handling</li>
              <li>CORS enabled for p5 Python web editor</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Running on Custom Port</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl mb-2">Development</h3>
                <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                  {`npm run dev:port 3001`}
                </pre>
              </div>
              <div>
                <h3 className="text-xl mb-2">Production</h3>
                <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                  {`npm run start:port 3001`}
                </pre>
              </div>
            </div>
          </section>
        </div>
        </div>
      </main>
  );
}