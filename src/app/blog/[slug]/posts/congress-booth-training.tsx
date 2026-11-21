import Link from "next/link";

export function congressBoothTrainingPost() {
  return (
    <>
      <p>The hall is empty at 10:15.</p>

      <p>
        Your crew is leaning on the counter and somebody is answering email
        on the demo laptop. The exhibition floor looks like an airport after
        the last flight. Then the morning session lets out, the coffee
        stations open, and for the next half hour every delegate in the
        building walks past your stand holding a cup. A crew trained for a
        trade show spends the quiet hour bored and the busy half hour behind.
      </p>

      <p>
        Congress is the word much of the world uses for a conference. In
        Spanish it&rsquo;s congreso, in Portuguese congresso, and in the U.S.
        it mostly means a medical or scientific meeting. Whatever the
        language, the delegates paid to attend sessions, and the exhibition
        is the hallway between them.
      </p>

      <p>
        My booth years were in cybersecurity. I ran Arxan
        Technologies&rsquo; booth at RSA Conference three years straight, and
        when I built Illumio&rsquo;s Latin America channel program I ran
        on-site execution at Latin American cybersecurity conferences. The
        core briefing I give a booth crew is in{" "}
        <Link href="/blog/trade-show-booth-staff-training">
          my trade show booth staff training notes
        </Link>
        , and the version for crews who answer to three different bosses is{" "}
        <Link href="/blog/exhibition-stand-staff-training">
          exhibition stand staff training for mixed crews
        </Link>
        . This one is the adjustment for a congress. Almost all of it is
        about time.
      </p>

      <h2>Print the Program and Circle the Breaks</h2>

      <p>
        The best training prop for a congress stand costs nothing. It&rsquo;s
        the printed program grid, with every coffee break and lunch circled
        in red marker, taped to the back of the counter where only the crew
        can see it.
      </p>

      <p>
        I&rsquo;d walk the whole crew through that grid on the stand during
        build, and staff to it. Every circled break gets the full crew, standing
        at the front edge, nobody on a phone. During sessions, two people
        hold the stand and everyone else eats, writes up their notes from the
        last rush, or (my favorite instruction, and the one people argue
        with) goes and sits in a session. Send one rep to whichever talk is
        closest to what we sell. They come back with something better than a
        pitch, which is the thing the room was arguing about twenty minutes
        ago.
      </p>

      <p>
        At RSA Conference, with forty thousand attendees, the expo floor is
        a destination for a lot of people and traffic runs most of the day.
        Training a crew for a steady stream and then dropping them into a
        congress, where the stream arrives as a flood four or five times a
        day, is how you end up with a stand that&rsquo;s overstaffed at 10:15
        and drowning at 10:40.
      </p>

      <h2>What Changes Between a Trade Show and a Congress</h2>

      <div className="post-table-wrap">
        <table className="post-table">
          <caption>
            Congress booth training compared with trade show booth training:
            what changes on the floor and what I&rsquo;d train for it
          </caption>
          <thead>
            <tr>
              <th scope="col">What changes</th>
              <th scope="col">Trade show (RSA Conference)</th>
              <th scope="col">Congress</th>
              <th scope="col">What I&rsquo;d train</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">When traffic arrives</th>
              <td>Most of the day, with a lunch bump</td>
              <td>In waves at coffee breaks and lunch, near-empty during sessions</td>
              <td>A rota built from the program grid, full crew at every break</td>
            </tr>
            <tr>
              <th scope="row">Who walks up</th>
              <td>CISOs and security architects, plus the odd channel partner</td>
              <td>Clinicians and researchers, often the authors of the papers being presented</td>
              <td>Hand-offs to the most technical person on shift, by name</td>
            </tr>
            <tr>
              <th scope="row">The opening line</th>
              <td>A question about the visitor&rsquo;s problem</td>
              <td>&ldquo;Which session did you just come out of?&rdquo;</td>
              <td>One rep sits in the most relevant session each day</td>
            </tr>
            <tr>
              <th scope="row">What people want to take home</th>
              <td>A demo, a meeting, sometimes the swag</td>
              <td>Data, a reprint, a contact who can answer a follow-up</td>
              <td>What can be handed over on the stand and what gets sent after</td>
            </tr>
            <tr>
              <th scope="row">Giveaways</th>
              <td>Your call, within the show&rsquo;s rules</td>
              <td>At medical congresses, restricted for doctors by codes like PhRMA&rsquo;s (U.S.) and EFPIA&rsquo;s (Europe)</td>
              <td>Nothing goes on the counter that legal hasn&rsquo;t cleared</td>
            </tr>
            <tr>
              <th scope="row">Language</th>
              <td>English, nearly always</td>
              <td>Often the host country&rsquo;s, plus English in the sessions</td>
              <td>Translate the opener and the hand-off line, skip translating the deck</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>One Opener for the Whole Crew</h2>

      <p>&ldquo;Which session did you just come out of?&rdquo;</p>

      <p>
        Every delegate walking past at 10:40 is carrying a talk in their
        head, and asking about it gets you a real answer faster than any
        question about their pain points. It also tells your crew who to
        hand the visitor to. If they came out of the session your rep sat in,
        that rep takes the conversation. If they presented in it, find your
        most senior technical person, because the second question from the
        author of the paper is going to be a hard one, and a congress
        delegate will notice a memorized answer even faster than a security
        architect at Moscone.
      </p>

      <p>
        The note rule from my trade show briefing holds here without
        changes: one sentence in the scanner&rsquo;s notes field after every
        real conversation, something the human actually said. The session
        they came from is a perfectly good note.
      </p>

      <h2>Medical Congresses: Compliance Is Somebody Else&rsquo;s Script</h2>

      <p>
        If you sell drugs or devices, what your crew may say to a doctor is
        written by your medical-legal team, and nobody running the booth
        (me included) should be improvising around it. Industry codes like
        the PhRMA Code in the U.S. and EFPIA&rsquo;s in Europe restrict what
        a company can hand a healthcare professional, and questions about
        uses a product isn&rsquo;t approved for usually get routed to
        medical affairs staff at a separate desk.
      </p>

      <p>
        My part of the training is narrower and more practical. Every person
        on the stand, including the agency staff, practices the redirect line
        out loud until it sounds like a sentence a person would say, and can
        point to the medical information desk without looking for it. I&rsquo;d
        rehearse that on the carpet, during build, with the compliance
        reviewer standing there listening. Five minutes.
      </p>

      <h2>Ask Before You Scan</h2>

      <p>
        I&rsquo;d train everyone to ask before they scan a badge:
        &ldquo;Can I scan you so we can send you that?&rdquo; It&rsquo;s good
        manners anywhere. At a congress in Europe (GDPR) or Brazil (LGPD), it
        also puts your legal team in a cleaner position, and they will ask
        how the list was built.
      </p>

      <h2>Where Each Training Format Fits (and Where It Doesn&rsquo;t)</h2>

      <div className="post-table-wrap">
        <table className="post-table">
          <caption>
            Congress booth training formats: best fit, timing, length and the
            honest trade-off
          </caption>
          <thead>
            <tr>
              <th scope="col">Format</th>
              <th scope="col">Best for</th>
              <th scope="col">When</th>
              <th scope="col">Length</th>
              <th scope="col">Key trade-off</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Compliance module from medical-legal</th>
              <td>Any medical congress where you sell drugs or devices</td>
              <td>Weeks before</td>
              <td>Whatever legal requires</td>
              <td>Required, and teaches nobody where to stand</td>
            </tr>
            <tr>
              <th scope="row">Night-before briefing in a hotel room</th>
              <td>Your own reps, product and lead rules</td>
              <td>The night before doors open</td>
              <td>About 20 minutes</td>
              <td>Nobody sees the stand, so the rota stays abstract</td>
            </tr>
            <tr>
              <th scope="row">Program walk-through on the stand during build</th>
              <td>The whole crew, including partner and agency staff</td>
              <td>After the graphics go up</td>
              <td>15 to 20 minutes</td>
              <td>Needs the crew on site a day early, which costs a hotel night each</td>
            </tr>
            <tr>
              <th scope="row">Coffee break drill</th>
              <td>A crew new to congress traffic</td>
              <td>The first session block on day one</td>
              <td>Ten minutes, before the first break hits</td>
              <td>It eats the one quiet hour you&rsquo;d have used for setup fixes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        The compliance module wins outright at a medical congress, because
        you can&rsquo;t open the stand without it, and on that point the
        medical-legal team outranks anyone running the booth. For a
        cybersecurity or business congress with no regulated product, the
        hotel briefing is fine if your crew has worked congresses before. If
        they haven&rsquo;t, I&rsquo;d take the walk-through on the stand plus
        the drill, every time, and pay the extra hotel night. A crew that has
        seen 10:15 and 10:40 once on that carpet knows what Tuesday looks
        like.
      </p>

      <h2>The Last Afternoon</h2>

      <p>
        The final coffee break of a congress is half empty because the
        delegates are already checking out of their hotels, so that&rsquo;s when I&rsquo;d
        let one person hold the stand and send everyone else to write up
        the notes they skipped on day two.
      </p>

      <p>
        If you&rsquo;re taking a booth to its first congress and want someone
        who will circle the breaks in red with your crew,{" "}
        <Link href="/#contact">let&rsquo;s talk</Link>.
      </p>
    </>
  );
}
