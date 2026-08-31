import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.ldsinfrastructure.com'

  const staticRoutes = [
    '',
    '/capabilities',
    '/company',
    '/insights',
    '/partner-with-us',
    '/quality-safety',
    '/vendor-capabilities',
  ]

  const capabilityRoutes = [
    '/capabilities/turnkey-electrification',
    '/capabilities/substations-switchyards',
    '/capabilities/transmission-lines',
    '/capabilities/underground-cable-laying',
    '/capabilities/industrial-electrification',
    '/capabilities/healthcare-electrical-infrastructure',
    '/capabilities/warehouse-electrification',
    '/capabilities/testing-commissioning',
    '/capabilities/electrical-maintenance',
  ]

  const projectRoutes = [
    '/projects/kohora-assam-substation',
    '/projects/assam-hill-medical-college',
    '/projects/sarojini-naidu-medical-hospital',
    '/projects/shri-krishna-medical-college',
    '/projects/sonotel',
  ]

  const allRoutes = [...staticRoutes, ...capabilityRoutes, ...projectRoutes]

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1.0 : route.startsWith('/capabilities') || route.startsWith('/projects') ? 0.8 : 0.6,
  }))
}
