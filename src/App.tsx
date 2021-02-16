import { ReactElement, ReactNode, useState } from 'react';
import './App.css';

//Conventional props

function Heading({ title }: {title: string;}) {
  return (
    <h1>{title}</h1>
  )
}

function HeadingWithContent({ children }: {children: ReactNode;}): ReactElement | null {
  return (
    <h1>{children}</h1>
  )
}

//default props
const defaultContainerProps = {
  heading: <strong>My Heading</strong>
}

type ContainerProps = {children: ReactNode } & typeof defaultContainerProps;
Container.defaultProps = defaultContainerProps;

//functional props
function TextWithNumber({
  header,
  children
}: {
  header?: (num: number) => ReactNode; 
  children: (num: number) => ReactNode;
}) {
  const [state, stateSet] = useState<number>(1);

  return (
    <div>
      {header && <h2>{header?.(state)}</h2>}
      <div>
        {children(state)}
      </div>
      <div>
        <button onClick={() => stateSet(state + 1)}>Add</button>
      </div>
    </div>
  )
}

// List 
function List<ListItem>({
  items,
  render,
}: {
  items: ListItem[],
  render: (item: ListItem) => ReactNode
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {render(item)}
        </li>
      ))}
    </ul>
  )
}

function Container({ 
  heading, 
  children 
}: ContainerProps ): ReactElement {
  return (
    <div>
      <h1>
        {heading}
      </h1>
      {children}
    </div>
  )
}


function App() {
  return (
    <div>
      <Heading title='Hello'></Heading>
      <HeadingWithContent>
        <strong>Hi</strong>
      </HeadingWithContent>
      <Container>
        Foo
      </Container>
      <TextWithNumber >
        {(num: number) => <div>Today's number is {num}</div>}
      </TextWithNumber>
      <List 
        items={['jack', 'sadie', 'oso']} 
        render={(item: string) => <div>{item.toLowerCase()}</div>}
      ></List>
    </div>
  );
}

export default App;



