import {
  Pagination,
  Stack,
  TableBody,
  TableHead,
  TableRow as TableRowMui
} from '@mui/material';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { setupApiClient } from '../../src/api/api';
import DialogRemove from '../../src/components/DialogRemove/DialogRemove';
import Filter from '../../src/components/Filter/Filter';
import { ItemFilter } from "../../src/components/Filter/interfaces/Item.interface";
import Layout from '../../src/components/Layout';
import Swipeable from '../../src/components/Swipeable/Swipeable';
import Table from '../../src/components/Table/Table';
import { TableCell } from '../../src/components/Table/TableCell';
import { TableRow } from '../../src/components/Table/TableRow';
import { ComponentModel, ComponentResponse } from '../../src/interfaces/component.interface';
import { currentPage } from '../../src/ROUTES';
import { filterModel, loadingState, modelState, useModelMutations } from '../../src/state/atom';
import { formatDate, formatNumber } from '../../src/utils/format';
import { withSSRAuth } from '../../src/utils/withSSRAuth';


const header = [
  'Data de Modificação', 
  'Part NUmber',
  'Nível',
  'Espessura (mm)',
  'Tempo de Tolerância de Baking (minutos)',
  'Número Máximo de Baking'
];



const partnumberFilter: ItemFilter[] = [
  {
    name: 'CodePartNumber',
    label: 'Part-Number',
    type: 'text'
  },
  // {
  //   name: 'HumiditySensitivity',
  //   label: 'SENSIBILIDADE À UMIDADE',
  //   type: 'radio'
  // },
  // {
  //   name: 'Temperature',
  //   label: 'Temperatura',
  //   type: 'slider'
  // },
  {
    name: 'NumberMaxBacking',
    label: 'Número Máximo de Baking',
    type: 'text'
  },
  // {
  //   name: 'MinimumTime',
  //   label: 'Tempo minimo de exposicao',
  //   type: 'text'
  // },
  // {
  //   name: 'MaxTimeExposure',
  //   label: 'Tempo maximo de exposicao',
  //   type: 'text'
  // },
  // {
  //   name: 'CreateDate',
  //   label: 'Criado em',
  //   type: 'text'
  // },
  // {
  //   name: 'UpdateDate',
  //   label: 'Atualizado em',
  //   type: 'text'
  // },
  {
    name: 'ThicknessModel',
    label: 'Espessura',
    type: 'text'
  },
  {
    name: 'Level',
    label: 'Nível',
    type: 'text'
  },
  {
    name: 'User',
    label: 'Usuário',
    type: 'text'
  },
]




export default function PartNumber() {
  
  // const listItem: InventoryResponse[] = useRecoilValue<InventoryResponse[]>(filterModel);
  // const [model, setModel] = useRecoilState(modelState);
  const [hoverAction, setHoverAction] = useState<boolean>(false);
  const [urlFilter, setUrlFilter] = useState<string>('');
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  

  const router = useRouter();
  const { FormComponent, label } = currentPage(router.pathname)!;

  const { listAllModel } = useModelMutations();
  const { deleteModel } = useModelMutations();

  const handleDelete = async (value: ComponentModel) => {
    if (value.id) {
      await deleteModel<ComponentModel>({endpoint:'/partNumber', payload: {...value, id: value.id}})
      
    }
    console.log('handleDelete', value);
  };

  const listComponents:ComponentModel[] = useRecoilValue<ComponentModel[]>(filterModel);
  const [listItem, setListItem]  = useRecoilState<ComponentModel[]>(modelState);
  const [loading, setLoading]  = useRecoilState<boolean>(loadingState);

  // const [listItem, setListItem] = useState<ComponentModel[]>([]);

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  
  const updateUrlFilters = (url: string) => {
      console.log('teste de url ', url)
      setUrlFilter(url)
    }
    const handlePage = (e: React.ChangeEvent<unknown>, newPage: number) => {
      setPage(newPage);
    };

  const loadComponentData = () => {
      listAllModel<ComponentResponse>(
        `/partNumber?orderBy=CodePartNumber&orderByDesc=true&page=${page}&size=10&${urlFilter}`
      ).then((data) => {
        setListItem(data.result);
        // setPage(data.pageSize)
        setTotalPages(data.totalPages)
      });
  }

  useEffect(() => {
    loadComponentData()
  }, [page, urlFilter]);

  return (
    <Layout title="Home">
      <Filter onChangeFilter={updateUrlFilters} items={partnumberFilter}  endpoint='itens-expostos' />
      <Table>
        <TableHead>
          <TableRowMui sx={{ boxShadow: 'none', background: 'transparent' }}>
            {header.length > 0 &&
              header.map((field, index) => (
                <TableCell key={index}>
                  <>{field}</>
                </TableCell>
              ))}
          </TableRowMui>
        </TableHead>
        {/* Body */}
        <TableBody>
          {listItem &&
            listItem.length > 0 &&
            listItem.map((partnumber: ComponentModel, index) => (
              <TableRow key={partnumber.id}>
                <TableCell component="th" scope="row">
                  {formatDate(partnumber.updateDate)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {formatDate(partnumber.codePartNumber)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {formatDate(partnumber.level?.levelName)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {formatNumber(partnumber.espessura)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {formatNumber(partnumber.timeToleranceInBaking)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {partnumber.numberMaxBacking}
                </TableCell>
                <TableCell component="th" scope="row">
                  {<>
                    <Swipeable
                      type={'Update'}
                      tooltipLabel={`Atualizar ${label}`}
                      title={label}
                    >
                      
                        <FormComponent
                          action={"Update"}
                          data={{ id: partnumber.id,
                            codePartNumber: partnumber.codePartNumber,
                            levelId: partnumber.level?.id,
                            numberMaxBacking: partnumber.numberMaxBacking,
                            espessura: partnumber.espessura,
                            timeToleranceInBaking: partnumber.timeToleranceInBaking, }}
                        />
                      
                     
                    </Swipeable>
                    <DialogRemove
                      onAction={() => handleDelete(partnumber)}
                      id={partnumber.id}
                    />
                  </>
                  }
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        
      </Table>
        <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        top={20}
        marginTop={4}
      >

       <Pagination
            shape="rounded"
            onChange={handlePage}
            count={totalPages}
            siblingCount={0}
            boundaryCount={2}
      />
      </Stack>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = setupApiClient(ctx);

    await apiClient.get('account/currentUser');
    return {
      props: {},
    };
  }
);

// Só exposto abaixo de 100%;
// Acima de 100% excelente;
