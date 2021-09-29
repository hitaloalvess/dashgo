import dynamic from 'next/dynamic';
import { Flex, SimpleGrid, Box, Text, theme } from '@chakra-ui/react';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import { ApexOptions} from 'apexcharts';

const Chart = dynamic( () => import ('react-apexcharts'),{
    ssr:false
})

const options: ApexOptions ={
	chart:{
			toolbar:{ show: false },
			zoom: { enabled: false },
			foreColor: theme.colors.gray[500]
	},
	grid:{
		show:false
	},
	dataLabels:{
		enabled:false
	},
	tooltip:{
		enabled:false
	},
	xaxis:{
				type:'datetime',
				axisBorder:{ color: theme.colors.gray[600] },
				axisTicks:{ color: theme.colors.gray[600] },
				categories:[
							'2021-09-23T00:00:00.000Z',
							'2021-09-24T00:00:00.000Z',
							'2021-09-25T00:00:00.000Z',
							'2021-09-26T00:00:00.000Z',
							'2021-09-27T00:00:00.000Z',
							'2021-09-28T00:00:00.000Z',
							'2021-09-29T00:00:00.000Z',
				],
	},
	fill:{
			opacity: 0.3,
			type: 'gradient',
			gradient:{
					shade:'dark',
					opacityFrom: 0.7,
					opacityTo: 0.3
			}
	}
}

const series =[
	{ name: 'Semana', data: [123, 250, 1233, 450, 222, 302, 65]}
]

export default function Dashboard(){
    return(
        <Flex direction="column" h="100vh">
            <Header />

            <Flex
                w="100%"
                my="6"
                maxWidth="90%"
                mx="auto"
                px="6"
            >
                <SideBar />

                <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
                    <Box 
                        p="8"
                        bg="gray.800"
                        borderRadius="8"
                        pb="4"
                    >
                        <Text fontSize="lg" mb="4">Inscritos da semana</Text>
                        <Chart options={options} series={series} type="area" height={160} />
                    </Box>
                    <Box 
                        p="8"
                        bg="gray.800"
                        borderRadius="8"
                        pb="4"
                    >
                        <Text fontSize="lg" mb="4">Taxa de abertura</Text>
                        <Chart options={options} series={series} type="area" height={160} />
                    </Box>
                </SimpleGrid>

            </Flex>
        </Flex>
    )
}