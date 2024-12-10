import Head from "next/head";

export default function Profile({ props }) {
  return (
    <>
      <div className="bg-white pt-20 md:pt-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Welcome,
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              {props.data.bio || "No Bio Added"}
            </p>
            {/* <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {props.data.headLine || "No Headline"}
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              {props.data.bio || "No Bio Added"}
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
}
