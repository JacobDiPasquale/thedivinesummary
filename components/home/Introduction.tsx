export default function Introduction() {
  return (
    <section
      className="py-20 px-6"
      style={{ background: '#0a0806' }}
    >
      <div className="mx-auto" style={{ maxWidth: '680px' }}>
        <p
          className="font-cinzel uppercase mb-8 text-center"
          style={{ fontSize: '10px', letterSpacing: '0.45em', color: '#584848' }}
        >
          About This Commentary
        </p>
        <div
          className="font-garamond space-y-5"
          style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#a09090' }}
        >
          <p>
            This is a canto-by-canto prose commentary on Dante&apos;s{' '}
            <em>Divina Commedia</em>, written for a general educated reader who
            wants to engage seriously with one of the supreme achievements of
            Western literature. It covers all one hundred cantos — thirty-four in{' '}
            <em>Inferno</em>, thirty-three each in <em>Purgatorio</em> and{' '}
            <em>Paradiso</em>.
          </p>
          <p>
            Each entry goes beyond plot synopsis to address the poem&apos;s
            theology, allegory, political content, literary sources, and the human
            drama of the individual souls Dante encounters. The commentary assumes
            no knowledge of medieval Italian, Scholastic philosophy, or
            thirteenth-century Florentine politics — though it does not shy away
            from these subjects when they illuminate the text.
          </p>
          <p>
            The commentary draws on the scholarly traditions of Singleton,
            Sapegno, and Hollander, and on translations by Mandelbaum and
            Hollander. All interpretations are original.
          </p>
        </div>
      </div>
    </section>
  );
}
