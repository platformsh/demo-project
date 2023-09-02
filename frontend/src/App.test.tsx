import { render, screen, act } from '@testing-library/react';
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
    jest.clearAllMocks()
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
    expect(screen.getByText(`App scaled horizontally`)).toBeInTheDocument();
  });

  it('uses production intro for production', async () => {
    const mockData = {
      type: 'production',
      instance_count: 3,
      session_storage: 'redis'
    };
    
    // Use mockImplementationOnce
    mockedFetchEnvironment.mockImplementationOnce(() => Promise.resolve(mockData));
    

    render(<App />)
    const element = await screen.findByText(/This app is the React frontend of your demo/i);
    expect(element).toBeInTheDocument();
  });

  it('uses staging copy for non-production', async () => {
    const mockData = {
      type: 'other',
      instance_count: 3,
      session_storage: 'redis'
    };
    
    // Use mockImplementationOnce
    mockedFetchEnvironment.mockImplementationOnce(() => Promise.resolve(mockData));
    
    render(<App />)
    const element = await screen.findByText(/This space represents your byte-for-byte copy of production/i);
    expect(element).toBeInTheDocument();
  });
});
