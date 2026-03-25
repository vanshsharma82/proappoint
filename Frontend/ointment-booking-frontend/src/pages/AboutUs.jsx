
import bgImage from "../assets/images/aboutusf.jpg";
export default function AboutUs() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className=" bg-black/40 min-h-screen px-6 py-24 flex flex-col items-center">
          {/* backdrop-blur-xl */}
        {/* HERO SECTION */}
        <div className="max-w-4xl text-center text-white mb-16">
          <h1 className="text-5xl font-bold drop-shadow-lg">
            About <span className="text-blue-400">ProAppoint</span>
          </h1>
          <p className="mt-5 text-lg text-gray-200">
            ProAppoint is a smart appointment scheduling platform designed to
            simplify booking for professionals and users.
          </p>
        </div>

        {/* GLASS CONTENT BOX */}
        <div className="
            max-w-5xl w-full 
            bg-white/10 backdrop-blur-2xl 
            border border-white/20 
            rounded-3xl p-12 shadow-2xl
            transition-all duration-500 
            hover:scale-[1.01]
            hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]
            float-animation
        ">

          {/* OUR MISSION */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-3">Our Mission</h2>
            <p className="text-gray-200 text-lg">
              We aim to bridge the gap between professionals and clients through
              an intuitive online platform that supports seamless bookings.
            </p>
          </section>

          {/* FEATURES SECTION */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8">
              Why Choose ProAppoint?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="p-6 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-md">
                <h3 className="text-xl font-semibold text-white">📅 Easy Scheduling</h3>
                <p className="text-gray-200 mt-2">
                  Book appointments in seconds with a clean interface.
                </p>
              </div>

              <div className="p-6 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-md">
                <h3 className="text-xl font-semibold text-white">🔔 Smart Reminders</h3>
                <p className="text-gray-200 mt-2">
                  Never miss an appointment with automatic reminders.
                </p>
              </div>

              <div className="p-6 bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-md">
                <h3 className="text-xl font-semibold text-white">🛡 Secure & Reliable</h3>
                <p className="text-gray-200 mt-2">
                  Your data stays protected with modern security standards.
                </p>
              </div>

            </div>
          </section>

          {/* TEAM SECTION */}
          <section className="mt-16">
  <h2 className="text-3xl font-bold text-white mb-8 text-center">
    Meet the Creators
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

    {/* CREATOR CARD 1 */}
    <div className="
      bg-white/20 backdrop-blur-xl 
      border border-white/30 
      rounded-2xl p-6 
      shadow-xl 
      transition-all duration-500 
      hover:scale-[1.03]
      hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]
      flex flex-col items-center text-center
    ">
      <img
        src="https://cdn-icons-png.flaticon.com/512/848/848006.png"
        className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
      />
      <h3 className="text-xl font-semibold text-white mt-4">Manveer Singh</h3>
      <p className="text-gray-200 text-sm mt-2">
        Developer of ProAppoint — passionate about smooth UI and building
        tools that improve daily workflows.
      </p>
    </div>

    {/* CREATOR CARD 2 */}
    <div className="
      bg-white/20 backdrop-blur-xl 
      border border-white/30 
      rounded-2xl p-6 
      shadow-xl 
      transition-all duration-500 
      hover:scale-[1.03]
      hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]
      flex flex-col items-center text-center
    ">
      <img
        src="https://cdn-icons-png.flaticon.com/512/848/848006.png"
        className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
      />
      <h3 className="text-xl font-semibold text-white mt-4">Shubham</h3>
      <p className="text-gray-200 text-sm mt-2">
        Backend + API specialist — ensuring secure, fast, and reliable system performance.
      </p>
    </div>

    {/* CREATOR CARD 3 */}
    <div className="
      bg-white/20 backdrop-blur-xl 
      border border-white/30 
      rounded-2xl p-6 
      shadow-xl 
      transition-all duration-500 
      hover:scale-[1.03]
      hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]
      flex flex-col items-center text-center
    ">
      <img
        src="https://cdn-icons-png.flaticon.com/512/848/848006.png"
        className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
      />
      <h3 className="text-xl font-semibold text-white mt-4">Vansh Sharma</h3>
      <p className="text-gray-200 text-sm mt-2">
        UI/UX designer — creating modern, intuitive and seamless user experiences.
      </p>
    </div>
  </div>
</section>


        </div>

        {/* FOOTER */}
        <p className="text-gray-300 mt-16 text-sm">
          © {new Date().getFullYear()} ProAppoint — All rights reserved.
        </p>

      </div>
    </div>
  );
}
