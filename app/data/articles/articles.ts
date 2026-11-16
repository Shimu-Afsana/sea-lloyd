export type ArticleSection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
  subsections?: { heading: string; paragraphs: string[] }[]
}

export type Article = {
  id: string
  slug: string
  number: string
  category: string
  title: string
  excerpt: string
  publishedAt: string | null
  image: string
  imageAlt: string
  imagePosition?: string
  introduction: string
  sections: ArticleSection[]
  keyTakeaways: string[]
  relatedPortIds: string[]
  relatedArticleIds: string[]
  featured: boolean
}

export const articles: Article[] = [
  {
    id: 'regional-maritime-connectivity',
    slug: 'connecting-bangladesh-maritime-gateways',
    number: '01',
    category: 'Shipping network',
    title: "Connecting Bangladesh with the Region's Key Maritime Gateways",
    excerpt: 'Regional port connectivity plays an important role in international cargo movement. Discover how maritime gateways such as Chittagong, Colombo, Port Klang, and Singapore contribute to regional shipping connectivity and broader logistics planning.',
    publishedAt: null,
    image: 'sealloyd ship 2.jpeg',
    imageAlt: 'A container vessel at a commercial shipping port',
    imagePosition: 'center 54%',
    introduction: 'The movement of goods across borders depends on more than an ocean passage. Maritime gateways connect shipping networks with terminals, inland transportation, logistics facilities, and the commercial destinations where cargo is needed. Understanding how those pieces fit together gives shippers a more complete starting point for planning.',
    sections: [
      {
        heading: 'The importance of regional port connectivity',
        paragraphs: [
          'Ports are essential interfaces between international trade networks and the economies they serve. For exporters, dependable access to maritime gateways opens a path to overseas markets. For importers, port operations are one of the first steps in getting goods into the local supply chain.',
          'A cargo movement depends on the relationship between vessel calls, terminal operations, inland logistics, and the arrangements available for a particular shipment. Plans should therefore consider more than the distance between two ports: they also need to account for the cargo, service availability, timing, documentation, and final delivery requirements.',
        ],
        bullets: ['The origin and destination of the cargo', 'Available shipping and inland transportation arrangements', 'Terminal handling requirements and relevant milestones', 'Flexibility needed to respond to schedule or operational changes'],
      },
      {
        heading: 'Four important regional gateway locations',
        paragraphs: ['The following locations illustrate the variety of maritime gateways that contribute to regional logistics. Their inclusion is geographical and industry context, not a representation of a specific direct Sea Lloyd service between every location.'],
        subsections: [
          { heading: 'Chittagong, Bangladesh', paragraphs: ['Chittagong is an important maritime gateway for Bangladesh. Its port and connected logistics activity are relevant to cargo movements serving the country’s commercial and industrial areas. Considering the relationship between port operations and onward inland transportation is an important part of shipment planning.'] },
          { heading: 'Colombo, Sri Lanka', paragraphs: ['Positioned in the Indian Ocean, Colombo has a relevant place in regional maritime connectivity. Its geography connects it with wider ocean shipping networks and makes it a notable location to consider when evaluating regional logistics context.'] },
          { heading: 'Port Klang, Malaysia', paragraphs: ['Port Klang is an important Malaysian maritime gateway, supported by regional container logistics infrastructure. As with any port, the right arrangement for a shipment depends on available services, cargo needs, and the inland connections required.'] },
          { heading: 'Singapore', paragraphs: ['Singapore is a major maritime and logistics location in Southeast Asia. Its role in regional shipping and logistics makes it an important reference point in conversations about how international cargo networks connect.'] },
        ],
      },
      {
        heading: 'Coordinating port-to-inland cargo movement',
        paragraphs: [
          'A vessel’s arrival is one milestone in a longer cargo journey. After discharge, container collection, terminal procedures, and onward transportation need to be coordinated with the requirements of the shipment and its destination.',
          'Road and rail coordination, where available and appropriate, can connect port terminals with inland locations. Clear cargo documentation, accurate shipment references, and timely communication help the parties involved keep each handover aligned.',
        ],
        bullets: ['Confirm documentation and cargo identification details', 'Align collection arrangements with relevant terminal milestones', 'Coordinate onward transportation with receiving locations', 'Keep communication clear as shipment information changes'],
      },
      {
        heading: 'Planning for different shipping requirements',
        paragraphs: [
          'Commodities, cargo dimensions, handling sensitivities, destinations, and delivery expectations vary. Those differences may call for different routing and transportation arrangements, and they can affect how a shipment is prepared and managed at each stage.',
          'Sea Lloyd focuses on coordinated regional shipping arrangements and practical maritime logistics planning, with attention to the requirements of the cargo and the movement as a whole. Connected gateways are part of a broader trade picture: every shipment still needs a plan suited to its own circumstances.',
        ],
      },
      {
        heading: 'A connected view of regional trade',
        paragraphs: ['Looking across maritime gateways and inland connections helps shippers make informed decisions about cargo movement. With thoughtful coordination between ports, transportation, and logistics partners, regional trade can be planned with a clearer view of the journey ahead.'],
      },
    ],
    keyTakeaways: ['Port connectivity links ocean shipping to inland transportation and commercial destinations.', 'Chittagong, Colombo, Port Klang, and Singapore each provide distinct regional context.', 'Shipment plans should reflect cargo requirements, available arrangements, and operational milestones.', 'Clear coordination supports the handoffs between a port and the cargo’s final destination.'],
    relatedPortIds: ['chittagong', 'colombo', 'port-klang', 'singapore'],
    relatedArticleIds: ['intermodal-cargo-journey', 'vessel-schedule-information'],
    featured: true,
  },
  {
    id: 'intermodal-cargo-journey',
    slug: 'intermodal-cargo-journey',
    number: '02',
    category: 'Logistics insights',
    title: 'Beyond the Port: Understanding the Journey of Intermodal Cargo',
    excerpt: "A shipment's journey does not end when a vessel reaches port. Explore how road, rail, inland waterways, and maritime transportation can be coordinated to connect cargo origins, terminals, and final delivery locations.",
    publishedAt: null,
    image: '/sealloyd container 4.jpeg',
    imageAlt: 'Intermodal cargo moving through a port terminal',
    imagePosition: 'center center',
    introduction: 'A shipment’s journey is made up of connected stages. Reaching a seaport is only one part of the logistics picture: cargo also needs to move from its origin to the port, pass through relevant handling points, and continue toward its final destination. Intermodal planning considers those stages together.',
    sections: [
      {
        heading: 'What is intermodal transportation?',
        paragraphs: [
          'Intermodal transportation is the coordinated movement of cargo using more than one mode of transport. A shipment might travel by road, rail, inland waterway where suitable, and ocean vessel as part of a broader journey.',
          'When cargo remains in a suitable transport unit, such as a container, transfers between modes can be planned around the movement of that unit rather than repeatedly handling the goods inside. Each transfer still needs coordination among the relevant terminals and providers.',
        ],
        bullets: ['Multiple modes can contribute to one end-to-end journey', 'Cargo handovers connect one transportation stage to the next', 'Container continuity may be suitable for some shipments', 'The available infrastructure and services shape practical options'],
      },
      {
        heading: 'The role of ocean transportation',
        paragraphs: [
          'Ocean transportation carries cargo between maritime gateways as part of international trade. At the destination port, discharge and container handling begin the transition from the vessel leg to the next stage of the journey.',
          'Planning for that transition means understanding relevant port and terminal procedures, keeping cargo information aligned, and coordinating the onward transportation arrangements that apply to the shipment.',
        ],
      },
      {
        heading: 'Connecting inland locations through road and rail',
        paragraphs: [
          'Road freight can provide first-mile movement from a shipper’s location to a terminal and last-mile delivery from an arrival point to the receiver. Routes and equipment need to suit the cargo and the requirements of the locations involved.',
          'Rail can connect ports and inland terminals where suitable infrastructure and services are available. Inland container terminals may support cargo transfers and handling away from the seaport, but their role depends on the network and shipment plan.',
        ],
        bullets: ['First-mile and last-mile road movement', 'Rail connections where infrastructure and services are available', 'Inland terminal handovers when they fit the cargo route', 'Coordination of timing, cargo references, and receiving arrangements'],
      },
      {
        heading: 'Inland waterways and cargo handovers',
        paragraphs: [
          'Inland waterways and barge transportation can be considered in locations with suitable infrastructure and available services. They are not an option for every origin, destination, or shipment, so feasibility must be assessed for the specific movement.',
          'At every handover, accurate documentation, cargo identification, timing information, and communication help the transportation providers coordinate their part of the journey. Clear ownership of each milestone makes it easier to identify what needs attention next.',
        ],
      },
      {
        heading: 'A journey planned as a whole',
        paragraphs: ['Sea Lloyd considers transportation requirements across multiple shipment stages to support coordinated intermodal logistics. Looking beyond the port helps teams account for the connections that carry cargo from origin to destination, while keeping each arrangement grounded in the services and infrastructure actually available.'],
      },
    ],
    keyTakeaways: ['Intermodal transportation combines more than one mode in a coordinated cargo journey.', 'Ocean arrival is a transition point, not necessarily the end of cargo movement.', 'Road, rail, and inland waterway options depend on local infrastructure and available services.', 'Careful handover planning supports communication and continuity between providers.'],
    relatedPortIds: ['chittagong', 'colombo'],
    relatedArticleIds: ['connecting-bangladesh-maritime-gateways', 'planning-oversized-specialized-cargo'],
    featured: true,
  },
  {
    id: 'project-cargo-logistics',
    slug: 'planning-oversized-specialized-cargo',
    number: '03',
    category: 'Project & breakbulk',
    title: 'Planning the Movement of Oversized and Specialized Cargo',
    excerpt: 'Heavy machinery, industrial components, and oversized project cargo require careful transportation planning. Explore the considerations involved in cargo specifications, vessel suitability, loading arrangements, handling requirements, and coordinated logistics.',
    publishedAt: null,
    image: '/sea-lloyd-carousel.jpg',
    imageAlt: 'Specialized equipment prepared for a cargo operation',
    imagePosition: 'center center',
    introduction: 'Oversized, heavy, and specialized cargo can require more detailed planning than standard containerized freight. Dimensions, weight, handling sensitivity, and the way a piece of equipment can be lifted or secured all influence the transportation arrangements that may be appropriate.',
    sections: [
      {
        heading: 'Understand the cargo before planning',
        paragraphs: ['A useful plan starts with reliable cargo information. Measurements and weights should be confirmed, and the cargo’s shape, center of gravity, sensitivity, packaging, lifting points, and securing requirements should be understood before options are assessed.'],
        bullets: ['Overall dimensions and gross weight', 'Center of gravity and shape', 'Handling sensitivities and packaging', 'Lifting points, loading requirements, and securing considerations'],
      },
      {
        heading: 'Select suitable transportation arrangements',
        paragraphs: ['The cargo profile informs how vessel suitability, breakbulk transportation, heavy-lift requirements, specialized road transportation, and multimodal coordination are evaluated. Port infrastructure and the handling capabilities available at relevant locations also matter.', 'No single arrangement fits every project. The right approach depends on the cargo specifications, route, equipment, infrastructure, and services available for the movement.'],
      },
      {
        heading: 'Plan loading, securing, and discharge',
        paragraphs: ['Loading and discharge planning brings together equipment assessment, handling sequence, stowage considerations, and coordination among the operational parties. Cargo securing and suitable discharge arrangements need to be considered alongside the transportation plan.', 'Early review of these requirements helps identify what information and coordination may be needed at each port or transfer point.'],
        bullets: ['Assess lifting equipment against confirmed cargo details', 'Coordinate loading arrangements and handling sequence', 'Plan cargo securing and stowage considerations', 'Review discharge arrangements and relevant port requirements'],
      },
      {
        heading: 'Consider the route and operational requirements',
        paragraphs: ['Port capabilities, road dimensions and weight restrictions, suitable transport equipment, and permits where applicable can all affect how cargo moves between stages. Requirements should be checked for the specific locations and route rather than assumed to be uniform.', 'Coordinating transportation stages helps keep the port, vessel, and inland arrangements aligned with the cargo’s practical needs.'],
      },
      {
        heading: 'Communicate throughout the movement',
        paragraphs: ['Accurate cargo information and timely communication help relevant operational parties plan their responsibilities. If dimensions, weights, handling instructions, or timing assumptions change, the affected arrangements may need to be reviewed.', 'Sea Lloyd’s approach centers on cargo-specific project logistics planning, coordinated transportation arrangements, and careful attention to handling considerations—without assuming one solution works for every shipment.'],
      },
      {
        heading: 'A considered plan for specialized cargo',
        paragraphs: ['Specialized cargo movements benefit from a clear view of the cargo, route, equipment, handling requirements, and handovers involved. Thoughtful planning gives teams a practical foundation for coordinating the stages of a complex logistics journey.'],
      },
    ],
    keyTakeaways: ['Accurate dimensions, weight, center of gravity, and lifting information are essential planning inputs.', 'Vessel, port, road, and handling suitability depend on the specific cargo and route.', 'Loading, securing, stowage, and discharge should be considered as connected requirements.', 'Clear communication helps operational parties coordinate changing shipment details.'],
    relatedPortIds: ['chittagong', 'port-klang'],
    relatedArticleIds: ['intermodal-cargo-journey', 'vessel-schedule-information'],
    featured: true,
  },
  {
    id: 'vessel-schedule-planning',
    slug: 'vessel-schedule-information',
    number: '04',
    category: 'Vessel & shipping updates',
    title: 'Why Accurate Vessel Schedule Information Matters for Cargo Planning',
    excerpt: "Vessel schedules influence shipment planning, terminal coordination, and onward transportation arrangements. Understand the importance of monitoring published ETA, ETB, and ETD information while allowing for operational changes during a vessel's journey.",
    publishedAt: null,
    image: '/Sea Lloyd Multimodal Harbor at Sunrise.png',
    imageAlt: 'A container vessel underway on an international route',
    imagePosition: 'center center',
    introduction: 'Published vessel schedules help shippers plan cargo preparation, port coordination, and onward transportation. They provide important timing information, but estimates and planned milestones can change as a vessel moves through its journey and operational conditions evolve.',
    sections: [
      {
        heading: 'Understanding ETA, ETB, and ETD',
        paragraphs: ['ETA means Estimated Time of Arrival, ETB means Estimated Time of Berthing, and ETD means Estimated Time of Departure. These terms describe useful schedule milestones, but they are estimates or planned timings—not guarantees of an exact arrival, berthing, or departure time.'],
        bullets: ['ETA — Estimated Time of Arrival', 'ETB — Estimated Time of Berthing', 'ETD — Estimated Time of Departure'],
      },
      {
        heading: 'Why schedule information matters',
        paragraphs: ['Schedule information can help teams plan cargo readiness, export and import activities, terminal coordination, connecting transportation, and logistics resources. Sharing current information with the relevant parties supports more informed conversations about what needs to happen next.', 'The schedule is one planning input among many. Cargo readiness, documentation, port processes, and onward arrangements should be considered alongside published vessel timing.'],
      },
      {
        heading: 'Monitor vessel movements and updates',
        paragraphs: ['Checking the latest published schedule helps teams work from current information. Voyage references and port-specific timings are useful when identifying the movement that applies to a particular shipment.', 'Operational notices and schedule revisions should be reviewed as they become available. When an important milestone is approaching, confirming the latest information with the relevant parties can help keep preparations aligned.'],
        bullets: ['The latest published vessel schedule', 'Voyage references and port-specific timings', 'Operational notices relevant to the movement', 'Schedule revisions that may affect connecting arrangements'],
      },
      {
        heading: 'Understand why schedules can change',
        paragraphs: ['Estimated timings may be affected by weather, port congestion, operational requirements, and other circumstances during a vessel’s journey. The reason and impact of a change can vary, so a published schedule should be treated as planning information that may be updated.', 'Keeping arrangements flexible and communicating changes promptly can help stakeholders reassess cargo preparation and onward transportation.'],
      },
      {
        heading: 'Use published schedule information thoughtfully',
        paragraphs: ['Reviewing route-specific published sailing information and checking for updates are practical parts of cargo planning. Use the voyage and port details relevant to the shipment, and reconfirm important arrangements with the parties involved.', 'Sea Lloyd encourages users to consult the latest published schedule information as part of an informed planning process. No schedule estimate should be treated as a guarantee of arrival or departure timing.'],
      },
      {
        heading: 'Plan with current information',
        paragraphs: ['Vessel schedules are most useful when treated as current planning references and revisited as a shipment progresses. Monitoring updates and coordinating with relevant parties helps support informed shipping decisions while recognizing that operational conditions can change.'],
      },
    ],
    keyTakeaways: ['ETA, ETB, and ETD are estimates or planned milestones, not guaranteed timings.', 'Schedules support cargo readiness, terminal coordination, and onward transportation planning.', 'Check voyage-specific and port-specific updates as a movement progresses.', 'Operational conditions can change schedules; reconfirm important arrangements.'],
    relatedPortIds: ['chittagong', 'colombo', 'port-klang', 'singapore'],
    relatedArticleIds: ['connecting-bangladesh-maritime-gateways', 'intermodal-cargo-journey'],
    featured: true,
  },
]

export function getArticleReadingMinutes(article: Article) {
  const words = [article.introduction, ...article.sections.flatMap((section) => [
    ...section.paragraphs,
    ...(section.bullets ?? []),
    ...(section.subsections?.flatMap((subsection) => subsection.paragraphs) ?? []),
  ])].join(' ').trim().split(/\s+/).length

  return Math.max(1, Math.ceil(words / 220))
}


