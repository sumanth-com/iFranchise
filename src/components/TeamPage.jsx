const teamGridMembers = [
  {
    name: 'John Doe',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Mary Freund',
    role: 'Co-founder',
    image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Katie Sims',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Autumn Phillips',
    role: 'Sales Operations Officer',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Judith Rodriguez',
    role: 'Business Executive',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Chris Glasser',
    role: 'HR Executive',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Iva Ryan',
    role: 'Sr. Visual Designer',
    image: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Paula Mora',
    role: 'User Experience Designer',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
  },
];

const featureCards = [
  {
    title: 'Grow without fear',
    description: 'We place smart bets on people and long-term potential to help every team member thrive.',
    icon: '↗',
  },
  {
    title: 'Turbocharged results',
    description: 'Speed matters, but quality and precision are at the center of how we execute.',
    icon: '🏆',
  },
  {
    title: "We're one team",
    description: 'We collaborate across product, operations, and partnerships to move faster together.',
    icon: '👥',
  },
  {
    title: 'Take ownership',
    description: 'Everyone is encouraged to lead, decide, and improve the customer journey proactively.',
    icon: '♕',
  },
];

const cultureImages = [
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
];

function TeamPage() {
  const cultureLoopImages = [...cultureImages, ...cultureImages];

  return (
    <main className="relative z-10 w-full py-10 lg:py-16 text-slate-100">
      <section className="relative overflow-hidden bg-transparent py-20">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-600">Our Team</p>
              <h2 className="mt-4 text-5xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-6xl">
                Small team with
                <br />
                millions of ideas
              </h2>
            </div>
            <div className="hidden lg:block">
              <div className="animate-float-slow text-8xl">🧩</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-600">Team of experts</p>
            <h1 className="mt-4 text-4xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-5xl">
              We have a kick-ass
              <br />
              team for you
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              With years of franchise and growth experience, our team helps investors and brands turn ambition into
              measurable expansion.
            </p>
            <div className="mt-8 rounded-2xl border border-violet-500/25 card-premium-dark p-6">
              <p className="text-base leading-relaxed text-slate-200">
                &quot;I have always believed in prioritizing both our clients and our team equally. This approach ensures
                exceptional outcomes for every project.&quot;
              </p>
              <div className="mt-5 flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/80?img=33"
                  alt="Kimberly Mastrangelo"
                  className="h-11 w-11 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="text-sm font-semibold text-white">Kimberly Mastrangelo</p>
                  <p className="text-xs text-slate-500">CEO & Founder</p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-violet-500/25">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
              alt="Team collaboration"
              className="h-full min-h-[360px] w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((item) => (
            <article key={item.title} className="rounded-2xl border border-violet-500/25 card-premium-dark p-6">
              <span className="text-2xl text-violet-600">{item.icon}</span>
              <h3 className="mt-4 text-2xl font-bold tracking-tight text-white">{item.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-4 pb-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-600">Our Team</p>
          <h2 className="mt-3 text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl">
            Let&apos;s meet our awesome team
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {teamGridMembers.map((member) => (
            <article key={member.name} className="overflow-hidden rounded-2xl border border-violet-500/25 card-premium-dark p-3">
              <div className="overflow-hidden rounded-xl">
                <img src={member.image} alt={member.name} className="aspect-[4/5] w-full object-cover" loading="lazy" />
              </div>
              <div className="px-2 pb-2 pt-4">
                <p className="text-3xl font-semibold tracking-tight text-white">{member.name}</p>
                <p className="mt-1 text-2xl text-slate-500">{member.role}</p>
                <div className="mt-4 flex items-center gap-2">
                  <a
                    href="#"
                    aria-label={`${member.name} Instagram`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-violet-200 bg-violet-50 text-violet-600 transition duration-200 hover:-translate-y-0.5 hover:bg-violet-100"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5zm8.95 1.75a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-label={`${member.name} X`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-200 transition duration-200 hover:-translate-y-0.5 hover:bg-white/10"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                      <path d="M18.9 3h2.92l-6.38 7.3L23 21h-5.88l-4.6-6.01L7.3 21H4.37l6.82-7.8L1 3h6.03l4.15 5.42L18.9 3zm-1.03 16.22h1.62L6.16 4.7H4.42l13.45 14.52z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-label={`${member.name} LinkedIn`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-blue-600 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-100"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                      <path d="M6.94 8.5H3.56V20h3.38V8.5zM5.25 3A2.02 2.02 0 1 0 5.3 7.04 2.02 2.02 0 0 0 5.25 3zM20.44 13.26c0-3.04-1.62-4.95-4.37-4.95-1.27 0-2.11.7-2.46 1.2v-1h-3.37c.04.66 0 11.49 0 11.49h3.37v-6.42c0-.34.02-.68.12-.92.27-.68.87-1.39 1.88-1.39 1.32 0 1.85 1 1.85 2.48V20H20.44v-6.74z" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1320px] px-0 pb-20 sm:px-0 lg:px-0">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-600">Culture</p>
          <h2 className="mt-3 text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl">
            Our culture, keeping us fresh
          </h2>
        </div>

        <div className="mt-10 overflow-hidden">
          <div className="animate-marquee-left flex w-max items-center gap-6 py-2">
            {cultureLoopImages.map((image, idx) => (
              <div key={`${image}-${idx}`} className="overflow-hidden rounded-2xl border border-violet-500/25 card-premium-dark">
                <img src={image} alt="Team culture moment" className="h-64 w-[320px] object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default TeamPage;
