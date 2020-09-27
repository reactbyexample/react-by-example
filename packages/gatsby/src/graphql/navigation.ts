import { graphql, useStaticQuery } from 'gatsby'

interface NavigationQuery {
  allNavigationYaml: {
    nodes: {
      navigation: string[]
    }[]
  }
}

export const useNavigation = (): string[] => {
  const {
    allNavigationYaml: { nodes },
  } = useStaticQuery<NavigationQuery>(graphql`
    query NavigationQuery {
      allNavigationYaml {
        nodes {
          navigation
        }
      }
    }
  `)
  const [{ navigation }] = nodes
  return navigation
}
