import { useEffect, useState } from 'react';
import { Main, Box, SearchInput, Header, TextInput, Link, Field, useViewport } from '@aragon/ui';
import styled from 'styled-components';

function noop() {
  return null;
}
const GRAPH_URL = 'https://api.thegraph.com/index-node/graphql';
function getQuery(subgraphId: string) {
  return {
    query: `
      { indexingStatuses(subgraphs: ["${subgraphId}"]) {
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
  const [subgraphId, setSubgraphId] = useState('Qmet67pWbJPhVU5nLL6QfppkjKuyuxPtvJeP5voXidmGvo');
  const [result, setResult] = useState('');
  const { height } = useViewport();

  console.log('height', height);

  useEffect(() => {
    let cancel = false;

    const getHealth = async () => {
      if (!subgraphId) {
        setResult('');
        return;
      }
      const data = getQuery(subgraphId);
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
  }, [subgraphId]);

  return (
    <div className="scroll-view-container">
      <div className="scroll-view">
        <Main scrollView={false}>
          <Header primary="Subgraph Health" />
          <Box>
            <Field label="Subgraph Id">
              <SearchInput
                value={subgraphId}
                placeholder="Subgraph Id, i.e. Qm..."
                wide
                onChange={setSubgraphId}
              />
            </Field>
            {subgraphId && (
              <>
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

export default App;
