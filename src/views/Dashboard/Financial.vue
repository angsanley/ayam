<template>
    <div class="lg:h-screen pt-16 flex flex-col flex-wrap items-center">
        <div class="w-full container mt-4">
            <back-button/>
            <div class="flex flex-col md:flex-row justify-between">
                <div class="rounded-lg bg-red-400 dark-mode:bg-gray-900 dark-mode:text-red-400 text-white shadow-lg py-4 mb-2 md:mb-8 px-6 w-full md:mr-2">
                    <span class="font-title mb-2">Total Unpaid</span>
                    <div class="text-xl font-title font-bold">
                        Rp. {{ formatRupiah(financial.totalUnpaid)  }}
                    </div>
                </div>
                <div class="rounded-lg bg-green-500 dark-mode:bg-gray-900 dark-mode:text-green-500 text-white shadow-lg py-4 mb-2 md:mb-8 px-6 w-full md:mr-2">
                    <span class="font-title mb-2">Total Paid</span>
                    <div class="text-xl font-title font-bold">
                        Rp. {{ formatRupiah(storedFinancialData.totalPaid)  }}
                    </div>
                </div>
                <div class="rounded-lg bg-blue-400 dark-mode:bg-gray-900 dark-mode:text-blue-400 text-white shadow-lg py-4 mb-2 md:mb-8 px-6 w-full md:mr-2">
                    <span class="font-title mb-2">Total Charge</span>
                    <div class="text-xl font-title font-bold">
                        Rp. {{ formatRupiah(storedFinancialData.totalCharge)  }}
                    </div>
                </div>
            </div>
            <div v-if="financial.upcomingBills.length > 0" class="mt-4">
                <h3 class="mb-2">Upcoming Bills</h3>
                <upcoming-bills :bills="financial.upcomingBills"/>
            </div>
            <div class="mt-4">
                <h3 class="mb-2">Paid Bills</h3>
                <paid-bills :bills="financial.paidBills"/>
            </div>
        </div>
    </div>
</template>

<script>
    import UpcomingBills from "../../components/Dashboard/Financial/UpcomingBills";
    import RepositoryFactory from "../../repositories/RepositoryFactory";
    import PaidBills from "../../components/Dashboard/Financial/PaidBills";
    import BackButton from "../../components/Dashboard/BackButton";
    export default {
        name: "Financial",
        components: {BackButton, PaidBills, UpcomingBills},
        data() {
            return {
                financial: {
                    upcomingBills: '',
                    totalPaid: 0,
                    totalUnpaid: 0,
                },
            }
        },
        methods: {
            async loadFinancialData () {
                const FinancialRepository = RepositoryFactory.get('financial');
                const response = await FinancialRepository.getFinancialSummary();

                let newFinancialData = this.storedFinancialData;
                newFinancialData.financialSummary = response.data.reverse();
                await this.$store.dispatch('setFinancialData', newFinancialData);

                this.calculateBills();
            },
            async loadSummaryData() {
                const FinancialRepository = RepositoryFactory.get('financial');
                const responseVa = await FinancialRepository.getVirtualAccount();

                let newFinancialData = this.storedFinancialData;
                newFinancialData.totalPaid = responseVa.data[0]['payment'];
                newFinancialData.totalCharge = responseVa.data[0]['charge'];
                await this.$store.dispatch('setFinancialData', newFinancialData);
            },
            formatRupiah(number) {
                return parseInt(number).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            },
            calculateBills() {
                if (this.storedFinancialData.financialSummary) {
                    this.financial.upcomingBills = this.storedFinancialData.financialSummary.filter(el => {
                        return el['Status'] !== 'Paid';
                    });

                    this.financial.paidBills = this.storedFinancialData.financialSummary.filter(el => {
                        return el['Status'] === 'Paid';
                    });

                    this.financial.totalUnpaid = this.financial.upcomingBills.reduce((acc, cur) => {
                        return { 'item_amt': parseInt(acc['item_amt']) + parseInt(cur['item_amt']) };
                    })['item_amt'];
                }
            }
        },
        computed: {
            storedFinancialData() {
                return this.$store.getters.getFinancialData;
            }
        },
        mounted() {
            // check session
            this.$parent.checkSession();

            // inflate data
            this.financial.totalUnpaid = this.storedFinancialData.totalUnpaid;
            this.financial.totalPaid = this.storedFinancialData.totalPaid;
            this.financial.totalCharge = this.storedFinancialData.totalCharge;
            this.calculateBills();

            this.loadFinancialData();
            this.loadSummaryData();
        }
    }
</script>

<style scoped>

</style>
