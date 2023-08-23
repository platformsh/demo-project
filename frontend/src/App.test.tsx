import { render, screen } from '@testing-library/react';
import App from './App';
import { fetchEnvironment } from './utility/api';

// Mock the module and function
jest.mock('./utility/api', () => ({
  fetchEnvironment: jest.fn()
}));

// Cast the function to its mocked version
const mockedFetchEnvironment = fetchEnvironment as jest.Mock;

describe('<App />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully fetch environment data and set the state', async () => {
    const mockData = {
      type: 'staging',
      instance_count: 3,
      session_storage: 'redis'
    };
    
    // Use mockImplementationOnce
    mockedFetchEnvironment.mockImplementationOnce(() => Promise.resolve(mockData));
    
    render(<App />);
    
    await screen.findByText(mockData.type.charAt(0).toUpperCase() + mockData.type.slice(1));
    expect(screen.getByText(`User session service: ${mockData.session_storage}`)).toBeInTheDocument();
    expect(screen.getByText(`Scaling: Ready`)).toBeInTheDocument();
    expect(screen.getByText(`Scaled app instances: ${mockData.instance_count}`)).toBeInTheDocument();
  });
});
