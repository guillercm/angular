import { TestBed } from "@angular/core/testing";
import { IssuesService } from "./issues.service";
import { provideTanStackQuery, QueryClient } from "@tanstack/angular-query-experimental";
import { State } from "../interfaces/github-issue.interface";

const exampleLabel = 'Accessibility';

describe('IssuesService', () => {
  let service: IssuesService;
  const queryClient = new QueryClient();

  beforeEach(() => {
    TestBed.configureTestingModule({
      teardown: {
        destroyAfterEach: false, // para que no se destruya después de cada prueba
      },
      providers: [provideTanStackQuery(queryClient)],
    });

    service = TestBed.inject(IssuesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load labels', async () => {
    console.log({isLoading: service.labelsQuery.isLoading()})
    const { data } = await service.labelsQuery.refetch(); // refetch manda a recargar el último query
    expect(data?.length).toBe(30);

    const [label] = data!;

    expect(typeof label.color).toBe('string');
    expect(typeof label.default).toBe('boolean');
    expect(typeof label.description).toBe('string');
    expect(typeof label.id).toBe('number');
    expect(typeof label.name).toBe('string');
    expect(typeof label.node_id).toBe('string');
    expect(typeof label.url).toBe('string');
  });

  it('should set selected state, OPEN, CLOSED, ALL', async () => {

    const states: State[] = [State.All, State.Open, State.Closed];

    states.map(async (state: State) => {
      service.setSelectedState(state);
      expect(service.selectedState()).toBe(state);

      const { data } = await service.issuesQuery.refetch();
      data?.forEach((issue) => {
        if (state !== State.All) {
          expect(issue.state).toBe(state);
        }
      });
    });

  });

  it('should set selectedLabels', async () => {
    service.toggleLabel(exampleLabel);
    expect(service.selectedLabels().has(exampleLabel)).toBeTrue();

    service.toggleLabel(exampleLabel);
    expect(service.selectedLabels().has(exampleLabel)).toBeFalse();
  });

  it('should set selectedLabels and get issues by label', async () => {

    service.toggleLabel(exampleLabel);
    expect(service.selectedLabels().has(exampleLabel)).toBeTrue();

    const { data } = await service.issuesQuery.refetch();

    data?.forEach((issue) => {
      const hasLabel = issue.labels.some((l) => l.name === exampleLabel);
      expect(hasLabel).toBeTrue();
    });
  });
});
