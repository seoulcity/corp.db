<!-- src/routes/dashboard/companies_ko/+page.svelte -->
<script>
	import Pagination from './Pagination.svelte';
	import Search from './Search.svelte';

	export let data;
	let searchColumn = data.searchColumn || '';
	let searchQuery = data.searchQuery || '';
	let searchError = false;

	let currentPage = 1;
	const itemsPerPage = 20;
	const maxVisiblePages = 5;

	$: paginatedCompanies = data.companies.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);
	$: totalPages = Math.ceil(data.companies.length / itemsPerPage);

	function goToPage(page) {
		currentPage = page;
	}

	async function handleSearch(column, query) {
		const url = new URL(window.location);
		url.searchParams.set('searchColumn', column);
		url.searchParams.set('searchQuery', query);
		window.location = url;
	}

	let expandedCompany = null;
	let companyDetails = null;
	let isLoading = false;
	let isError = false;

  async function toggleDetails(company) {
    if (expandedCompany === company) {
      expandedCompany = null;
      companyDetails = null;
    } else {
      expandedCompany = company;
      isLoading = true;
      isError = false;

      try {
      const response = await fetch('/dashboard/companies_ko', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ corpCode: company.corp_code }),
      });


        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.error || 'Failed to fetch company details');
        }

        companyDetails = responseData;
      } catch (error) {
        console.error('Error fetching company details:', error);
        isError = true;
      } finally {
        isLoading = false;
      }
    }
  }
</script>


<h2 class="text-2xl font-bold mb-4">Companies (Korea)</h2>

<Search {searchColumn} {searchQuery} columns={data.columns} onSearch={handleSearch} {searchError} />

{#if searchQuery}
	<p class="mt-2 text-sm text-gray-500">"{searchQuery}" 검색 결과:</p>
{/if}

{#if data.error}
	<p class="text-red-500">{data.error}</p>
{:else if Array.isArray(data.companies) && data.companies.length > 0}
	<table class="w-full">
		<thead>
			<tr class="bg-gray-200">
				<th class="py-2 px-4"></th>
				<th class="py-2 px-4">ID</th>
				<th class="py-2 px-4">Created At</th>
				<th class="py-2 px-4">Corp Code</th>
				<th class="py-2 px-4">Corp Name</th>
				<th class="py-2 px-4">Stock Code</th>
				<th class="py-2 px-4">DB Modified At</th>
				<th class="py-2 px-4">Modify Date</th>
			</tr>
		</thead>
		<tbody>
			{#each paginatedCompanies as company, index}
				<tr
					class:bg-gray-100={index % 2 === 0}
					on:click={() => toggleDetails(company)}
					class="cursor-pointer"
				>
					<td class="py-2 px-4">{expandedCompany === company ? '▼' : '▶'}</td>
					<td class="py-2 px-4">{company.id}</td>
					<td class="py-2 px-4">{company.created_at}</td>
					<td class="py-2 px-4">{company.corp_code}</td>
					<td class="py-2 px-4">{company.corp_name}</td>
					<td class="py-2 px-4">{company.stock_code}</td>
					<td class="py-2 px-4">{company.db_modified_at}</td>
					<td class="py-2 px-4">{company.modify_date}</td>
				</tr>
				{#if expandedCompany === company}
					<tr>
						<td colspan="8" class="py-4 px-4">
							<h2 class="text-xl font-bold mb-2">상세 정보</h2>
							{#if isLoading}
								<p>자료를 불러오는 중입니다...</p>
							{:else if isError}
								<p class="text-red-500">자료를 불러오는 중 오류가 발생했습니다.</p>
							{:else if companyDetails}
								<table>
									<tbody>
										<tr>
											<th>정식명칭</th>
											<td>{companyDetails.corp_name || '-'}</td>
										</tr>
										<tr>
											<th>영문명칭</th>
											<td>{companyDetails.corp_name_eng || '-'}</td>
										</tr>
										<tr>
											<th>종목명(상장사) 또는 약식명칭(기타법인)</th>
											<td>{companyDetails.stock_name || '-'}</td>
										</tr>
										<tr>
											<th>상장회사의 종목코드(6자리)</th>
											<td>{companyDetails.stock_code || '-'}</td>
										</tr>
										<tr>
											<th>대표자명</th>
											<td>{companyDetails.ceo_nm || '-'}</td>
										</tr>
										<tr>
											<th>법인구분</th>
											<td>{companyDetails.corp_cls || '-'}</td>
										</tr>
										<tr>
											<th>법인등록번호</th>
											<td>{companyDetails.jurir_no || '-'}</td>
										</tr>
										<tr>
											<th>사업자등록번호</th>
											<td>{companyDetails.bizr_no || '-'}</td>
										</tr>
										<tr>
											<th>주소</th>
											<td>{companyDetails.adres || '-'}</td>
										</tr>
										<tr>
											<th>홈페이지</th>
											<td
												>{companyDetails.hm_url
													? `<a href="${companyDetails.hm_url}" target="_blank">${companyDetails.hm_url}</a>`
													: '-'}</td
											>
										</tr>
										<tr>
											<th>IR홈페이지</th>
											<td
												>{companyDetails.ir_url
													? `<a href="${companyDetails.ir_url}" target="_blank">${companyDetails.ir_url}</a>`
													: '-'}</td
											>
										</tr>
										<tr>
											<th>전화번호</th>
											<td>{companyDetails.phn_no || '-'}</td>
										</tr>
										<tr>
											<th>팩스번호</th>
											<td>{companyDetails.fax_no || '-'}</td>
										</tr>
										<tr>
											<th>업종코드</th>
											<td>{companyDetails.induty_code || '-'}</td>
										</tr>
										<tr>
											<th>설립일(YYYYMMDD)</th>
											<td>{companyDetails.est_dt || '-'}</td>
										</tr>
										<tr>
											<th>결산월(MM)</th>
											<td>{companyDetails.acc_mt || '-'}</td>
										</tr>
									</tbody>
								</table>
							{/if}
						</td>
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>
	<Pagination {currentPage} {totalPages} {maxVisiblePages} onPageChange={goToPage} />
{:else}
	<p>No companies found. Please try a different search.</p>
{/if}
