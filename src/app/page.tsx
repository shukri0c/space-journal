export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center">
      <section className="mb-40">
        <h1 className="text-4xl font-bold mb-4 mt-50 text-center">
          Welcome to the Stargazer's Journal!
        </h1>
        <p className="text-lg text-center">
          Store your observations of the night sky! //add login and signup
          buttons
        </p>
      </section>

      <section className=" ml-50 mr-50 mt-10 mb-50 text-center">
        <h2 className="mb-6">About</h2>
        <p>
          Having trouble keeping your observations tidy? Want somewhere you can
          store your notes as well as recieve astronomical data about the night
          sky? Look no further! The Stargazer's Journal is here to help you keep
          track of your stargazing adventures. Whether your a beginner or an
          intermediate stargazer, this app is perfect for you!
        </p>
      </section>

      <section className=" ml-50 mr-50 mb-16 grid grid-cols-3 gap-8">
        <div className="mb-4">
          <h3>Log Your Observations</h3>
          <p className="text-gray-300 mt-2">
            {" "}
            Keep track of stars, planets and observations{" "}
          </p>
        </div>
        <div className=" mb-4">
          <h3>Discover Events</h3>
          <p className="text-gray-300 mt-2">
            {" "}
            Recieve information on what astronomical event is taking place{" "}
          </p>
        </div>
        <div className="mb-4">
          <h3> Interactive Sky Map (WORK IN PROGRESS) </h3>
          <p className="text-gray-300 mt-2">
            {" "}
            View how the sky looked the day you logged your observation!{" "}
          </p>
        </div>
      </section>
    </main>
  );
}
