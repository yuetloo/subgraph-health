import { useEffect, useState, useMemo } from 'react';
import { Main, Box, SearchInput, Header, TextInput, Link, Field, useViewport } from '@aragon/ui';
import styled from 'styled-components';

function noop() {
  return null;
}
const GRAPH_URL = 'https://api.thegraph.com/index-node/graphql';
function getQuery(subgraphName: string) {
  return {
    query: `
      { indexingStatusForCurrentVersion(subgraphName: "${subgraphName}") {
          synced
          health
          fatalError {
            message
            block {
              number
              hash
            }
            handler
          }
          chains {
            network
            earliestBlock {
              number
            }
            chainHeadBlock {
              number
            }
            latestBlock {
              number
            }
          }
        }
      }
    `,
  };
}

function App() {
  const [subgraphName, setSubgraphName] = useState('yuetloo/clrfund');
  const [result, setResult] = useState('');
  const { height } = useViewport();

  console.log('height', height);

  useEffect(() => {
    let cancel = false;

    const getHealth = async () => {
      if (!subgraphName) {
        setResult('');
        return;
      }
      const data = getQuery(subgraphName);
      const response = await fetch(GRAPH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!cancel) {
        const jsonResult = await response.json();
        console.log('respnse', data, jsonResult);
        setResult(JSON.stringify(jsonResult, null, 2));
      }
    };

    getHealth();

    return () => {
      cancel = true;
    };
  }, [subgraphName]);

  const explorerUrl = useMemo(() => {
    return `https://thegraph.com/legacy-explorer/subgraph/${subgraphName}`;
  }, [subgraphName]);

  return (
    <div className="scroll-view-container">
      <div className="scroll-view">
        <Main scrollView={false}>
          <Header primary="Subgraph Health" />
          <Box>
            <Field label="Subgraph Name">
              <SearchInput
                value={subgraphName}
                placeholder="Subgraph name, i.e. yuetloo/clrfund"
                wide
                onChange={setSubgraphName}
              />
            </Field>
            {subgraphName && (
              <>
                <Field label="Subgraph legacy explorer">
                  <StyledLink href={explorerUrl}>{explorerUrl}</StyledLink>
                </Field>
                <Field label="Health status">
                  <StyledTextInput
                    height={height}
                    value={result}
                    wide
                    multiline
                    onChange={noop}
                  ></StyledTextInput>
                </Field>
              </>
            )}
          </Box>
        </Main>
      </div>
    </div>
  );
}

const StyledTextInput = styled(TextInput)`
  height: ${(props) => `${props.height - 300}px`};
`;

const StyledLink = styled(Link)`
  word-break: break-all;
  overflow-wrap: break-word;
  white-space: normal;
  text-align: left;
`;

export default App;
