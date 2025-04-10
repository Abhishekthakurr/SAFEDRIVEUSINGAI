export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            About SafeDrive
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Making roads safer with AI-powered drowsiness detection
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600">
                To prevent accidents and save lives by detecting driver fatigue and alertness in real-time using advanced AI technology.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-gray-600">
                Our system uses computer vision and machine learning to monitor driver behavior and provide timely alerts when signs of drowsiness are detected.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Why Choose Us
              </h2>
              <p className="text-gray-600">
                We combine cutting-edge technology with user-friendly design to create a reliable safety companion for every driver.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}