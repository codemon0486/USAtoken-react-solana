import Button from '@/components/Button'
import TokenAvatar from '@/components/TokenAvatar'
import ChevronRightIcon from '@/icons/misc/ChevronRightIcon'
import { useAppStore } from '@/store/useAppStore'
import { panelCard } from '@/theme/cssBlocks'
import { colors } from '@/theme/cssVariables'
import { routeToPage } from '@/utils/routeTools'
import { Box, Flex, Grid, GridItem, SimpleGrid, Text } from '@chakra-ui/react'
import { ApiV3Token, Token } from '@raydium-io/raydium-sdk-v2'
import Decimal from 'decimal.js'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import PortfolioPieChart, { IDLE_TOKENS_COLORS } from './PortfolioPieChart'
import { formatCurrency } from '@/utils/numberish/formatter'
import swapStyles from '../../../../Swap/swap.module.css'

export type IdleType = {
  token: ApiV3Token | undefined
  address: string
  amount: string
  amountInUSD: string
}

type PortfolioIdleProps = {
  idleBalance?: number | string
  productiveBalance?: number | string
  idleList?: IdleType[]
  cardTitle?: string
}

export default function PortfolioIdle({ idleBalance, productiveBalance, idleList, cardTitle }: PortfolioIdleProps) {
  const { t } = useTranslation()
  const connected = useAppStore((s) => s.connected)
  const isMobile = useAppStore((s) => s.isMobile)
  const idlePercent = useMemo(() => {
    if (idleBalance === undefined || productiveBalance === undefined) return 0
    return new Decimal(idleBalance).div(new Decimal(productiveBalance).add(idleBalance)).mul(100).toDecimalPlaces(2).toNumber()
  }, [idleBalance, productiveBalance])

  return (
    <Box className="infoCard">
      <Box>
        <Box
          bg={colors.backgroundHead}
          fontWeight="medium"
          h="48px"
          pl="24px"
          py="13px"
          borderRadius={'24px 24px 0px 0px'}
          className={swapStyles.top_header}
          zIndex={3}
          position={'relative'}
        >
          {cardTitle}
        </Box>
        <div style={{ display: 'flex' }}>
          <Flex background={colors.backgroundHead} className={swapStyles.swapbox_patch_left}></Flex>
          <Flex background={colors.backgroundCardTap} className={swapStyles.chartbox_patch_right_text}>
            <Text
              display={'flex'}
              justifyContent={'center'}
              fontSize={'18px'}
              lineHeight={'26px'}
              zIndex={4}
              position={'relative'}
              pl={'14px'}
              pt={'7px'}
              cursor={'pointer'}
            >
              {/* Swap */}
            </Text>
          </Flex>
        </div>
      </Box>
      <Box w="full" h="24px" bg={colors.backgroundCardTap}></Box>
      <Flex
        {...panelCard}
        display="flex"
        direction="column"
        overflow="hidden"
        boxShadow="none"
        flex={5}
        minW="300px"
        borderRadius={'0px 24px 24px 24px'}
        border="none"
        marginTop={'-24px'}
        scrollSnapAlign={'end'}
        scrollMargin={5}
        onClick={({ currentTarget }) => {
          if (isMobile) {
            currentTarget.scrollIntoView({ behavior: 'smooth' })
          }
        }}
      >
        {/* <Box bg={colors.backgroundHead} fontWeight="medium" h="48px" pl="24px" py="13px" className={swapStyles.top_header}>
          {t('portfolio.idle_tokens')}
        </Box> */}
        <Flex flexWrap="wrap" flexGrow={1} bg={colors.backgroundHead} py="30px" px={['20px', '30px']}>
          <Grid
            flexGrow={1}
            gridTemplate={[
              `
              "pie   pie  " 2fr
              "total total" 1fr
              "list  list " 1fr / 1fr .4fr
            `,
              `
              "pie total" auto
              "pie list " auto / minmax(100px, 1fr) 2fr
            `
            ]}
            maxHeight={'40vh'}
            overflowY={'auto'}
            columnGap={3}
          >
            <GridItem area={'pie'} w="full" placeSelf={'center'}>
              {connected ? (
                <PortfolioPieChart
                  data={[{ value: 100 - idlePercent }, { value: idlePercent }]}
                  valueDataKey="value"
                  palette={IDLE_TOKENS_COLORS}
                  roundCenterLabel={idlePercent + '%'}
                />
              ) : (
                <PortfolioPieChart
                  data={[{ value: 100 - idlePercent }, { value: 10 }]}
                  valueDataKey="value"
                  palette={IDLE_TOKENS_COLORS}
                  roundCenterLabel={'--' + '%'}
                />
              )}
            </GridItem>

            <GridItem area={'total'} justifySelf={['center', 'unset']}>
              <Text fontSize={['20px', '28px']} fontWeight="medium">
                {formatCurrency(idleBalance, { symbol: '$', decimalPlaces: 2 })}
              </Text>
            </GridItem>

            <GridItem area={'list'}>
              {connected ? (
                <AssetsList idleList={idleList} />
              ) : (
                <Grid
                  fontSize={['sm', 'md']}
                  gridTemplate={[
                    `
                  "avatar symbol i1 i2 btn" auto / auto 1fr 1.3fr 1.3fr 1.5fr
                  `,
                    //   `
                    //   "avatar symbol btn" auto
                    //   "i1 i2 btn" auto / 1fr 1fr 1fr
                    // `,
                    `
                "avatar symbol i1 i2 btn" auto / auto 1fr 1.3fr 1.3fr 1.5fr
              `
                  ]}
                  alignItems={'center'}
                  columnGap={2}
                >
                  <GridItem>
                    <img src="/images/solana.png" width="20px" height="20px" alt="" />
                  </GridItem>
                  <GridItem area={'symbol'}>
                    <Text fontWeight="medium">SOL</Text>
                  </GridItem>
                  <GridItem area={'i1'}>
                    <Text color={colors.textSecondary}>0</Text>
                  </GridItem>
                  <GridItem area={'i2'}>
                    <Text color={colors.textSecondary}>$ 0</Text>
                  </GridItem>
                </Grid>
              )}
            </GridItem>
          </Grid>
        </Flex>
      </Flex>
    </Box>
  )
}

function AssetsList(props: { idleList?: IdleType[] }) {
  const { t } = useTranslation()
  const connected = useAppStore((s) => s.connected)
  return (
    <SimpleGrid mt="4" rowGap={[4, '12px']}>
      {props.idleList?.map((idle) => (
        <Grid
          key={idle.token?.name}
          fontSize={['sm', 'md']}
          gridTemplate={[
            `
              "avatar symbol i1 i2 btn" auto / auto 1fr 1.3fr 1.3fr 1.5fr
              `,
            //   `
            //   "avatar symbol btn" auto
            //   "i1 i2 btn" auto / 1fr 1fr 1fr
            // `,
            `
            "avatar symbol i1 i2 btn" auto / auto 1fr 1.3fr 1.3fr 1.5fr
          `
          ]}
          alignItems={'center'}
          columnGap={2}
        >
          <GridItem area={'avatar'}>
            <TokenAvatar size="smi" token={idle.token} />
          </GridItem>
          <GridItem area={'symbol'}>
            <Text fontWeight="medium">{idle.token?.symbol}</Text>
          </GridItem>
          <GridItem area={'i1'}>
            <Text color={colors.textSecondary}>
              {idle.amount ? formatCurrency(idle.amount, { decimalPlaces: 2, abbreviated: true }) : idle.amount}
            </Text>
          </GridItem>
          <GridItem area={'i2'}>
            <Text color={colors.textSecondary}>{formatCurrency(idle.amountInUSD, { symbol: '$', decimalPlaces: 2 })}</Text>
          </GridItem>
          {/* <GridItem area={'btn'} justifySelf={'end'}>
            {idle.token?.address ? (
              <Button
                size={'xs'}
                variant="outline"
                borderRadius="4px"
                py={[2, 3]}
                pr={1}
                pl={2}
                minWidth="none"
                onClick={() => routeToPage('pools', { queryProps: { token: idle.token!.address } })}
              >
                {t('common.pools')}
                <Box width={[3, 4]} height={[3, 4]} ml={[0.5, 1]}>
                  <ChevronRightIcon width={'100%'} height={'100%'} />
                </Box>
              </Button>
            ) : null}
          </GridItem> */}
        </Grid>
      ))}
    </SimpleGrid>
  )
}
