import { NodeShape } from '@patternfly/react-topology';

import { mockK8sResourcesData } from '../__fixtures__/1-deployments';
import { TYPE_VM } from '../const';
import { getBaseTopologyDataModel } from './data-transformer';

describe('data-transformer', () => {
  it('should return base topology data model with 5 nodes and 0 edges', () => {
    const baseDataModel = getBaseTopologyDataModel(
      mockK8sResourcesData.watchResourcesData as any,
    );
    expect(baseDataModel.nodes).toHaveLength(5);
    expect(baseDataModel.edges).toHaveLength(0);
  });

  it('should return base topology data model', () => {
    const mockWatchResourcesData = {
      ...mockK8sResourcesData.watchResourcesData,
      deployments: {
        data: [mockK8sResourcesData.watchResourcesData.deployments.data[0]],
      },
      virtualmachines: {
        data: [],
      },
    };
    const baseDataModel = getBaseTopologyDataModel(
      mockWatchResourcesData as any,
    );
    expect(baseDataModel.nodes).toHaveLength(1);
    expect(baseDataModel.edges).toHaveLength(0);
  });
  it('should return 2 Virtual Machine nodes and each Virtual Machine node shape should be Rectangle', () => {
    const mockWatchResourcesData = {
      ...mockK8sResourcesData.watchResourcesData,
      deployments: {
        data: [],
      },
    };
    const baseDataModel = getBaseTopologyDataModel(
      mockWatchResourcesData as any,
    );
    const virtualMachineNodes = baseDataModel.nodes?.filter(
      node => node.type === TYPE_VM,
    );
    expect(virtualMachineNodes).toHaveLength(2);
    virtualMachineNodes?.forEach(node => {
      expect(node.shape).toBe(NodeShape.rect);
    });
  });
});
